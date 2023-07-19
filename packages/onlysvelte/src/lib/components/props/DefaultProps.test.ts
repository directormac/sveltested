import { cleanup, render, screen } from "@testing-library/svelte";
import DefaultProps from "./DefaultProps.svelte";
import { describe, expect, it, vi } from "vitest";
import { get, writable } from "svelte/store";
import type { ComponentProps } from "svelte";
import userEvent from "@testing-library/user-event";

describe("Should render and manipulate props", async () => {
  afterEach(() => {
    cleanup();
  });

  it("doesn't pass prop", async () => {
    render(DefaultProps);
    expect(screen.queryByText("The answer is a mystery")).toBeInTheDocument();
  });

  it("set and update prop", async () => {
    // Pass your prop to the render function
    const { component } = render(DefaultProps, { answer: "I dunno" });

    expect(screen.queryByText("The answer is I dunno")).toBeInTheDocument();

    // Update prop using Svelte's Client-side component API
    await component.$set({ answer: "another mystery" });
    expect(
      screen.queryByText("The answer is another mystery")
    ).toBeInTheDocument();
  });

  it("Pass predefined prop to the component", () => {
    const prop: ComponentProps<DefaultProps> = { answer: "TypeScript!" };

    render(DefaultProps, prop);

    expect(screen.getByText("The answer is TypeScript!"));
  });
});
