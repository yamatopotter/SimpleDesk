export function transformToWorkflowOptions(data) {
  const newData = data.map((d) => {
    return {
      value: d.id,
      label: d.id == 1 ? "A fazer" : d.id == 2 ? "Fazendo" : "Feito",
    };
  });
  return newData;
}

export function transformToOptions(data) {
  const newData = data.map((d) => {
    return { value: d.id, label: d.name };
  });
  return newData;
}