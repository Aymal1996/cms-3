export function caseCol(val) {
    switch (val) {
      case 'exam': return 'green';
      case 'class': return 'blue';
      case 'holiday': return 'orange';
      case 'appointment': return 'purple';
      default : return 'blue';
    }
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}