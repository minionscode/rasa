import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";

const mocks = vi.hoisted(() => {
  return {
    getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
    onAuthStateChange: vi
      .fn()
      .mockReturnValue({ data: { subscription: { unsubscribe: vi.fn() } } }),
    signOut: vi.fn().mockResolvedValue({}),
    upsert: vi.fn().mockReturnValue({ error: null }),
    signInWithOAuth: vi.fn().mockResolvedValue({ redirected: true }),
  };
});

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    auth: {
      getSession: mocks.getSession,
      onAuthStateChange: mocks.onAuthStateChange,
      signOut: mocks.signOut,
    },
    from: () => ({ upsert: mocks.upsert }),
  },
}));

vi.mock("@/integrations/lovable", () => ({
  lovable: {
    auth: {
      signInWithOAuth: mocks.signInWithOAuth,
    },
  },
}));

import { useAuth } from "@/hooks/useAuth";

describe("useAuth", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.getSession.mockResolvedValue({ data: { session: null } });
    mocks.onAuthStateChange.mockReturnValue({
      data: { subscription: { unsubscribe: vi.fn() } },
    });
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
    // @ts-expect-error override for test
    window.location.replace = vi.fn();
    const { result } = renderHook(() => useAuth());
    await result.current.signOut();
    expect(mocks.signOut).toHaveBeenCalled();
    window.location.replace = originalReplace;
  });
});
