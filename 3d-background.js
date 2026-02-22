// ===================================
// AI NEURAL NETWORK — 3D Background
// Theme-aware: adapts to light & dark
// ===================================

(function () {

    const canvas = document.getElementById('bgCanvas');
    if (!canvas || typeof THREE === 'undefined') return;

    // ── Renderer ──────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(65, 1, 0.1, 500);
    camera.position.set(0, 0, 40);
    camera.lookAt(0, 0, 0);

    // ── Theme-aware Palettes ──────────────────────────────────────────────
    const PALETTES = {
        dark: {
            // Option 1 — Midnight AI
            layerColors: [0x22D3EE, 0x3B82F6, 0x6366F1, 0x6366F1, 0x3B82F6, 0x22D3EE],
            edgeColor: 0x3B82F6,
            light1Color: 0x6366F1,   // Blue-Purple
            light2Color: 0x22D3EE,   // Cyan
            light3Color: 0x7C3AED,   // Deep Purple
            ambientColor: 0xF1F5F9,
            ambientIntensity: 0.25,
            light1Intensity: 5,
            light2Intensity: 4,
            light3Intensity: 3,
            pulseColors: [0xF1F5F9, 0x22D3EE, 0x3B82F6, 0x6366F1, 0x06B6D4],
            fpColors: [0x3B82F6, 0x6366F1, 0x06B6D4, 0x7C3AED, 0x22D3EE],
            nodeOpacity: 0.92,
            edgeOpacity: 0.18,
        },
        light: {
            // Option 2 — Clean Light
            layerColors: [0x06B6D4, 0x0EA5E9, 0x4F46E5, 0x4F46E5, 0x0EA5E9, 0x06B6D4],
            edgeColor: 0x4F46E5,
            light1Color: 0x4F46E5,   // Indigo
            light2Color: 0x0EA5E9,   // Sky Blue
            light3Color: 0x06B6D4,   // Cyan
            ambientColor: 0x0F172A,
            ambientIntensity: 0.50,
            light1Intensity: 4,
            light2Intensity: 3,
            light3Intensity: 2,
            pulseColors: [0x0F172A, 0x4F46E5, 0x0EA5E9, 0x6366F1, 0x06B6D4],
            fpColors: [0x4F46E5, 0x0EA5E9, 0x06B6D4, 0x6366F1, 0x3B82F6],
            nodeOpacity: 0.85,
            edgeOpacity: 0.22,
        },
    };

    function isDarkMode() {
        return document.documentElement.getAttribute('data-theme') === 'dark';
    }

    function getPalette() {
        return isDarkMode() ? PALETTES.dark : PALETTES.light;
    }

    // ── Lighting ──────────────────────────────────────────────────────────
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.25);
    scene.add(ambientLight);

    const pl1 = new THREE.PointLight(0xffffff, 5, 100); pl1.position.set(-25, 15, 15); scene.add(pl1);
    const pl2 = new THREE.PointLight(0xffffff, 4, 100); pl2.position.set(25, -15, 15); scene.add(pl2);
    const pl3 = new THREE.PointLight(0xffffff, 3, 100); pl3.position.set(0, 20, -10); scene.add(pl3);

    // ── Neural Network Layout ─────────────────────────────────────────────
    const LAYERS = [3, 5, 7, 7, 5, 3];
    const LAYER_COUNT = LAYERS.length;
    const LAYER_X_SPAN = 46;
    const LAYER_X_STEP = LAYER_X_SPAN / (LAYER_COUNT - 1);
    const NODE_Y_STEP = 3.0;

    const world = new THREE.Group();
    scene.add(world);

    const networkNodes = []; // {mesh, ringMesh, layer, idx}
    const edgeMaterials = [];

    // ── Build Nodes ────────────────────────────────────────────────────────
    LAYERS.forEach((count, li) => {
        for (let ni = 0; ni < count; ni++) {
            const x = -LAYER_X_SPAN / 2 + li * LAYER_X_STEP;
            const y = -(count - 1) * NODE_Y_STEP / 2 + ni * NODE_Y_STEP;
            const z = (Math.random() - 0.5) * 2.5;

            const radius = (li === 0 || li === LAYER_COUNT - 1) ? 0.38 : 0.30;

            const nodeMat = new THREE.MeshPhongMaterial({
                color: 0xffffff,
                emissive: 0xffffff,
                emissiveIntensity: 0.7,
                transparent: true,
                opacity: 0.92,
                shininess: 200,
            });
            const mesh = new THREE.Mesh(new THREE.SphereGeometry(radius, 20, 20), nodeMat);
            mesh.position.set(x, y, z);

            const ringMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.30 });
            const ringMesh = new THREE.Mesh(new THREE.TorusGeometry(radius * 1.9, 0.045, 8, 32), ringMat);
            ringMesh.rotation.x = Math.PI / 2;
            mesh.add(ringMesh);

            world.add(mesh);
            networkNodes.push({ mesh, ringMesh, layer: li, idx: ni });
        }
    });

    // ── Build Edges ────────────────────────────────────────────────────────
    const edgeData = [];

    for (let li = 0; li < LAYER_COUNT - 1; li++) {
        const fromNodes = networkNodes.filter(n => n.layer === li);
        const toNodes = networkNodes.filter(n => n.layer === li + 1);

        fromNodes.forEach(from => {
            toNodes.forEach(to => {
                const geo = new THREE.BufferGeometry().setFromPoints([from.mesh.position, to.mesh.position]);
                const mat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.18 });
                edgeMaterials.push(mat);
                world.add(new THREE.Line(geo, mat));
                edgeData.push({ from, to });
            });
        });
    }

    // ── Data Pulses ────────────────────────────────────────────────────────
    const PULSE_COUNT = 55;
    const pulses = [];

    function pickEdge() { return edgeData[Math.floor(Math.random() * edgeData.length)]; }

    const pulseMaterials = [];
    for (let i = 0; i < PULSE_COUNT; i++) {
        const mat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.9 });
        const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.10, 8, 8), mat);
        pulseMaterials.push(mat);
        world.add(mesh);
        pulses.push({ mesh, mat, edge: pickEdge(), progress: Math.random(), speed: 0.004 + Math.random() * 0.007 });
    }

    // ── Floating Ambient Particles ─────────────────────────────────────────
    const FP_COUNT = 1200;
    const fpPos = new Float32Array(FP_COUNT * 3);
    const fpCol = new Float32Array(FP_COUNT * 3);
    const fpSpeed = new Float32Array(FP_COUNT);

    for (let i = 0; i < FP_COUNT; i++) {
        const i3 = i * 3;
        fpPos[i3] = (Math.random() - 0.5) * 80;
        fpPos[i3 + 1] = (Math.random() - 0.5) * 60;
        fpPos[i3 + 2] = (Math.random() - 0.5) * 30 - 5;
        fpSpeed[i] = 0.003 + Math.random() * 0.010;
        // initialise white; applyPalette will set real colors
        fpCol[i3] = fpCol[i3 + 1] = fpCol[i3 + 2] = 1;
    }

    const fpGeo = new THREE.BufferGeometry();
    fpGeo.setAttribute('position', new THREE.BufferAttribute(fpPos, 3));
    fpGeo.setAttribute('color', new THREE.BufferAttribute(fpCol, 3));
    const fpMat = new THREE.PointsMaterial({ size: 0.11, vertexColors: true, transparent: true, opacity: 0.60, sizeAttenuation: true });
    scene.add(new THREE.Points(fpGeo, fpMat));

    // ── Apply Palette ─────────────────────────────────────────────────────
    function applyPalette() {
        const P = getPalette();

        // Lights
        ambientLight.color.setHex(P.ambientColor);
        ambientLight.intensity = P.ambientIntensity;
        pl1.color.setHex(P.light1Color); pl1.intensity = P.light1Intensity;
        pl2.color.setHex(P.light2Color); pl2.intensity = P.light2Intensity;
        pl3.color.setHex(P.light3Color); pl3.intensity = P.light3Intensity;

        // Nodes
        networkNodes.forEach(n => {
            const col = new THREE.Color(P.layerColors[n.layer]);
            n.mesh.material.color.set(col);
            n.mesh.material.emissive.set(col);
            n.mesh.material.opacity = P.nodeOpacity;
            n.ringMesh.material.color.set(col);
        });

        // Edges — tint between adjacent layer colors
        let edgeIdx = 0;
        for (let li = 0; li < LAYER_COUNT - 1; li++) {
            const fromNodes = networkNodes.filter(n => n.layer === li);
            const toNodes = networkNodes.filter(n => n.layer === li + 1);
            const edgeCol = new THREE.Color(P.layerColors[li]).lerp(new THREE.Color(P.layerColors[li + 1]), 0.5);
            const count = fromNodes.length * toNodes.length;
            for (let k = 0; k < count; k++) {
                if (edgeMaterials[edgeIdx]) {
                    edgeMaterials[edgeIdx].color.set(edgeCol);
                    edgeMaterials[edgeIdx].opacity = P.edgeOpacity;
                }
                edgeIdx++;
            }
        }

        // Pulses
        pulseMaterials.forEach((mat, i) => {
            mat.color.setHex(P.pulseColors[i % P.pulseColors.length]);
        });

        // Floating particles
        for (let i = 0; i < FP_COUNT; i++) {
            const i3 = i * 3;
            const hex = P.fpColors[i % P.fpColors.length];
            const col = new THREE.Color(hex).lerp(new THREE.Color(0xffffff), 0.2);
            fpCol[i3] = col.r;
            fpCol[i3 + 1] = col.g;
            fpCol[i3 + 2] = col.b;
        }
        fpGeo.attributes.color.needsUpdate = true;
    }

    // Apply on first load
    applyPalette();

    // Watch for theme toggle
    const themeObserver = new MutationObserver(() => applyPalette());
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    // ── Mouse Parallax ────────────────────────────────────────────────────
    let tX = 0, tY = 0, cX = 0, cY = 0, lastMove = 0;
    document.addEventListener('mousemove', e => {
        tX = (e.clientX / window.innerWidth - 0.5) * 1.0;
        tY = (e.clientY / window.innerHeight - 0.5) * 0.7;
        lastMove = Date.now();
    });
    document.addEventListener('touchmove', e => {
        if (e.touches.length > 0) {
            tX = (e.touches[0].clientX / window.innerWidth - 0.5) * 1.0;
            tY = (e.touches[0].clientY / window.innerHeight - 0.5) * 0.7;
        }
    }, { passive: true });

    // ── Animation Loop ────────────────────────────────────────────────────
    let t = 0;

    function animate() {
        requestAnimationFrame(animate);
        t += 0.01;

        // Mouse parallax
        cX += (tX - cX) * 0.04;
        cY += (tY - cY) * 0.04;
        world.rotation.y = cX * 0.28;
        world.rotation.x = cY * 0.18;

        // Idle auto-rotate
        if (Date.now() - lastMove > 2500) world.rotation.y += 0.001;

        // Node glow pulse
        networkNodes.forEach((n, idx) => {
            const pulse = 0.5 + 0.5 * Math.sin(t * 1.6 + idx * 0.5);
            n.mesh.material.emissiveIntensity = 0.25 + pulse * 0.85;
            n.ringMesh.material.opacity = 0.08 + pulse * 0.32;
        });

        // Move pulses
        pulses.forEach(p => {
            p.progress += p.speed;
            if (p.progress >= 1) { p.progress = 0; p.edge = pickEdge(); }
            p.mesh.position.lerpVectors(p.edge.from.mesh.position, p.edge.to.mesh.position, p.progress);
            const fade = p.progress < 0.08 ? p.progress / 0.08
                : p.progress > 0.92 ? (1 - p.progress) / 0.08
                    : 1;
            p.mat.opacity = fade * 0.95;
        });

        // Drift floating particles
        for (let i = 0; i < FP_COUNT; i++) {
            fpPos[i * 3 + 1] += fpSpeed[i];
            if (fpPos[i * 3 + 1] > 30) fpPos[i * 3 + 1] = -30;
        }
        fpGeo.attributes.position.needsUpdate = true;

        // Throb lights
        pl1.intensity = getPalette().light1Intensity + Math.sin(t * 0.55) * 1.2;
        pl2.intensity = getPalette().light2Intensity + Math.sin(t * 0.75 + 1.5) * 1.2;

        renderer.render(scene, camera);
    }

    animate();

    // ── Resize ────────────────────────────────────────────────────────────
    function onResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', onResize);
    onResize();

})();
