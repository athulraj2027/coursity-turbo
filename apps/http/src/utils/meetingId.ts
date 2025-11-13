export function generateRoomCode() {
  const chars = "abcdefghijklmnopqrstuvwxyz";
  let code = "";
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  // Format like "abc-defg"
  return code.slice(0, 3) + "-" + code.slice(3);
}
