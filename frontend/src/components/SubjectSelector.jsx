import './SubjectSelector.css';

const subjects = [
    { id: 'school', label: '🏫 School', color: '#10b981' },
    { id: 'college', label: '🎓 College', color: '#6366f1' },
    { id: 'programming', label: '💻 Programming', color: '#8b5cf6' },
    { id: 'exam-prep', label: '📝 Exam Prep', color: '#f59e0b' },
    { id: 'general', label: '📚 General', color: '#6c757d' }
];

function SubjectSelector({ subject, onSelectSubject }) {
    return (
        <div className="subject-selector">
            {subjects.map((subj) => (
                <button
                    key={subj.id}
                    className={`subject-btn ${subject === subj.id ? 'active' : ''}`}
                    style={{ '--subject-color': subj.color }}
                    onClick={() => onSelectSubject(subject === subj.id ? null : subj.id)}
                >
                    {subj.label}
                </button>
            ))}
        </div>
    );
}

export default SubjectSelector;
