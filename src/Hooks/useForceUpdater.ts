import { useState } from "react";

export function useForceUpdate() {
  return useState({})[1];
}