import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";

const mockGetSession = vi.fn().mockResolvedValue({ data: { session: null } });
const mockOnAuthStateChange = vi.fn().mockReturnValue({ data: { subscription: { unsubscribe: vi.fn() } } });
const mockSignOut = vi.fn().mockResolvedValue({});
const mockUpsert = vi.fn().mockReturnValue({ error: null });
const mockSignInWithOAuth = vi.fn().mockResolvedValue({ redirected: true });

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    auth: {
      getSession: mockGetSession,
      onAuthStateChange: mockOnAuthStateChange,
      signOut: mockSignOut,
    },
    from: () => ({ upsert: mockUpsert }),
  },
}));

vi.mock("@/integrations/lovable", () => ({
  lovable: {
    auth: {
      signInWithOAuth: mockSignInWithOAuth,
    },
  },
}));

import { useAuth } from "@/hooks/useAuth";

describe("useAuth", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetSession.mockResolvedValue({ data: { session: null } });
    mockOnAuthStateChange.mockReturnValue({ data: { subscription: { unsubscribe: vi.fn() } } });
  });

  it("initialises with loading true and user null", () => {
    const { result } = renderHook(() => useAuth());
    expect(result.current.loading).toBe(true);
    expect(result.current.user).toBeNull();
  });

  it("sets loading false after session check", async () => {
    const { result } = renderHook(() => useAuth());
    await waitFor(() => expect(result.current.loading).toBe(false));
  });

  it("exposes signInWithGoogle and signOut functions", () => {
    const { result } = renderHook(() => useAuth());
    expect(typeof result.current.signInWithGoogle).toBe("function");
    expect(typeof result.current.signOut).toBe("function");
  });

  it("calls supabase signOut on signOut()", async () => {
    const originalReplace = window.location.replace;
    window.location.replace = vi.fn();
    const { result } = renderHook(() => useAuth());
    await result.current.signOut();
    expect(mockSignOut).toHaveBeenCalled();
    window.location.replace = originalReplace;
  });
});
