export function isInt(n) {
  return Number(n) === n && n % 1 === 0;
}

export function isFloat(n) {
  return Number(n) === n && n % 1 !== 0;
}

export function validateRuc(ruc: any) {
  //11 dígitos y empieza en 10,15,16,17 o 20
  if (
    !(
      (ruc >= 1e10 && ruc < 11e9) ||
      (ruc >= 15e9 && ruc < 18e9) ||
      (ruc >= 2e10 && ruc < 21e9)
    )
  )
    return false;

  for (var suma = -(ruc % 10 < 2), i = 0; i < 11; i++, ruc = (ruc / 10) | 0)
    suma += (ruc % 10) * ((i % 7) + ((i / 7) | 0) + 1);
  return suma % 11 === 0;
}

export function validateDni(data) {
  const dni = data
    .replace("-", "")
    .trim()
    .toUpperCase();
  if (!dni || dni.length < 9) return false;
  const multiples = [3, 2, 7, 6, 5, 4, 3, 2];
  const dcontrols = {
    numbers: [6, 7, 8, 9, 0, 1, 1, 2, 3, 4, 5],
    letters: ["K", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
  };
  const numdni = dni.substring(0, dni.length - 1).split("");
  const dcontrol = dni.substring(dni.length - 1);
  const dsum = numdni.reduce((acc, digit, index) => {
    acc += digit * multiples[index];
    return acc;
  }, 0);
  const key = 11 - (dsum % 11);
  const index = key === 11 ? 0 : key;
  if (/^\d+$/.test(dni)) {
    return dcontrols.numbers[index] === parseInt(dcontrol, 10);
  }
  return dcontrols.letters[index] === dcontrol;
}
