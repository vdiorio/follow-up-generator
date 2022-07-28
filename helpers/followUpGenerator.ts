interface Parameters {
  date: string,
  inicio: string,
  fim: string,
  engagement: number,
  students: {student: string, description: string}[],
  positive: string,
  atention: string,
  bestory: string,
}

const formatDate = (date: string) => {
  const [, month, day] = date.split('-');
  return `${day}/${month}`;
};

const capitalizeName = (name: string) => {
  return name.split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
};

export default function generate(d: Parameters) {
  return `*${formatDate(d.date)} | TRIBOS A, B e C*\n
:data: *Agenda:*
${d.inicio} - ${d.fim} - Monitoria em grupo;\n
:pessoas_se_abraçando: *Engajamento*:
• Monitoria em grupo: ${d.engagement} pessoas;\n
:página_enrolada: *Resumo:*
*Monitoria em grupo:*
${d.students
      .map((s) => `• \`${capitalizeName(s.student)}\` - ${s.description}.\n`)
      .join('')}
:joinha: *Pontos Positivos:*
• ${d.positive || '-NA-'}\n
:soco: *Pontos para melhoria:*
• ${d.bestory || '-NA-'}\n
:atenção: *Pontos de Atenção:*
• ${d.atention || '-NA-'}`;
}
