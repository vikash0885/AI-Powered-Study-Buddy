import './MoodSelector.css';

function MoodSelector({ onSelectMood }) {
    const moods = [
        { emoji: '😊', label: 'Happy', value: 'happy', color: '#FFD93D' },
        { emoji: '😴', label: 'Tired', value: 'tired', color: '#A8DADC' },
        { emoji: '😤', label: 'Focused', value: 'focused', color: '#457B9D' },
        { emoji: '😍', label: 'Excited', value: 'excited', color: '#F72585' }
    ];

    return (
        <div className="mood-overlay">
            <div className="mood-modal">
                <h2 className="mood-title">How are you feeling today? 🎯</h2>
                <p className="mood-subtitle">Select your mood and I'll personalize your experience!</p>

                <div className="mood-grid">
                    {moods.map((mood) => (
                        <button
                            key={mood.value}
                            className="mood-button"
                            onClick={() => onSelectMood(mood.value)}
                            style={{ '--mood-color': mood.color }}
                        >
                            <span className="mood-emoji">{mood.emoji}</span>
                            <span className="mood-label">{mood.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MoodSelector;
