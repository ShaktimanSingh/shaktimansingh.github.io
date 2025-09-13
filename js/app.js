// THREE.js Background
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);
const renderer = new THREE.WebGLRenderer({
	canvas: document.getElementById("bg"),
	alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);

const geometry = new THREE.BufferGeometry();
const count = 800;
const positions = new Float32Array(count * 3);

for (let i = 0; i < count * 3; i++) {
	positions[i] = (Math.random() - 0.5) * 20;
}

geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

const material = new THREE.PointsMaterial({
	color: 0x00e6e6,
	size: 0.05
});

const points = new THREE.Points(geometry, material);
scene.add(points);

camera.position.z = 5;

function animate() {
	requestAnimationFrame(animate);
	points.rotation.y += 0.0008;
	points.rotation.x += 0.0003;
	renderer.render(scene, camera);
}
animate();

// GSAP Animations
gsap.from(".title", { y: 50, opacity: 0, duration: 1, ease: "power3.out" });
gsap.from(".tagline", { y: 50, opacity: 0, delay: 0.3, duration: 1 });
gsap.from(".btn", { y: 50, opacity: 0, delay: 0.6, duration: 1 });

// Scroll Animations
gsap.utils.toArray("section").forEach(section => {
	gsap.from(section.querySelectorAll("h2, p, .skill, .project-card, form"), {
		scrollTrigger: {
			trigger: section,
			start: "top 80%",
		},
		opacity: 0,
		y: 50,
		duration: 1,
		stagger: 0.2
	});
});

// Resize fix
window.addEventListener("resize", () => {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
});
