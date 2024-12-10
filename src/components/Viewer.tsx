import React, { useEffect, useRef } from "react";
import * as OBC from "@thatopen/components";

const Viewer: React.FC = () => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const initializeViewer = async () => {
            if (!containerRef.current) return;

            // Initialize components
            const components = new OBC.Components();

            // Create the world (scene, camera, renderer)
            const worlds = components.get(OBC.Worlds);
            const world = worlds.create<
                OBC.SimpleScene,
                OBC.SimpleCamera,
                OBC.SimpleRenderer
            >();

            world.scene = new OBC.SimpleScene(components);
            world.renderer = new OBC.SimpleRenderer(components, containerRef.current);
            world.camera = new OBC.SimpleCamera(components);

            components.init();

            // Set camera position
            world.camera.controls.setLookAt(12, 6, 8, 0, 0, -10);

            // Setup scene
            world.scene.setup();

            // Add grid to the scene
            const grids = components.get(OBC.Grids);
            grids.create(world);

            // IFC loader
            const fragments = new OBC.FragmentsManager(components);

            // Function to load and display IFC
            const loadIfc = async () => {
                const file = await fetch(
                    "https://thatopen.github.io/engine_components/resources/small.frag",
                );
                const dataBlob = await file.arrayBuffer();
                const buffer = new Uint8Array(dataBlob);
                const model = fragments.load(buffer);
                world.scene.three.add(model);
            };
            await loadIfc();
        };

        initializeViewer();

        return () => {
            // Cleanup when unmounting
            containerRef.current = null;
        };
    }, []);

    return (
        <div
            ref={containerRef}
            style={{
                width: "100vw",
                height: "100vh",
                position: "relative",
            }}
        />
    );
};

export default Viewer;
