import { useState } from "react";

export function useSound() {
  const audio = new Audio("/wrong-sound.mp3");
  audio.play();
}
