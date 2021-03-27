const months = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
]

function handleDateFormat(date: string): string {
  const formatedDate = new Date(date);

  return `${formatedDate.getDate()} de ${months[formatedDate.getMonth()]} de ${formatedDate.getFullYear()}`;
}

export default handleDateFormat;
