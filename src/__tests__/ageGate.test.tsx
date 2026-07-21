import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

vi.mock("@tanstack/react-router", () => ({
  useRouter: () => ({ navigate: vi.fn() }),
  useRouterState: () => "/",
}));

vi.mock("@/components/AgeRestrictionPolicyModal", () => ({
  AgeRestrictionPolicyModal: () => null,
}));

vi.mock("@/assets/rasa-logo.png", () => ({ default: "rasa-logo.png" }));

import { AgeGate } from "@/components/AgeGate";

describe("AgeGate", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it("renders the gate when not verified", () => {
    render(<AgeGate />);
    expect(screen.getByText(/content intended for adults/i)).toBeTruthy();
  });

  it("does not render when already verified in sessionStorage", () => {
    sessionStorage.setItem("rasa_age_verified", "1");
    const { container } = render(<AgeGate />);
    expect(container.firstChild).toBeNull();
  });

  it("shows error when Enter clicked without checking", () => {
    render(<AgeGate />);
    fireEvent.click(screen.getByText("Enter"));
    expect(screen.getByText(/please agree/i)).toBeTruthy();
  });

  it("checkbox toggles on click", () => {
    render(<AgeGate />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox.getAttribute("aria-checked")).toBe("false");
    fireEvent.click(checkbox);
    expect(checkbox.getAttribute("aria-checked")).toBe("true");
  });

  it("sets sessionStorage and exits on Enter after checking", async () => {
    render(<AgeGate />);
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByText("Enter"));
    expect(sessionStorage.getItem("rasa_age_verified")).toBe("1");
  });
});
