import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
	component: About,
});

function About() {
	return <div className="mb-5 bg-red-500 p-3 text-2xl">Hello from About!</div>;
}
