export const TabTitle = (newTitle) => {
    return document.title = newTitle
}

const gradeColor = (grade) => {
    switch(grade) {
        case 'A+': return 'c-success';
        case 'A': return 'c-success';
        case 'A-': return 'c-success';
        case 'B+': return 'c-success';
        case 'B': return 'c-pending';
        case 'B-': return 'c-pending';
        case 'C': return 'c-pending';
        case 'D': return 'c-error';
        default: return  'c-error'
    }
}