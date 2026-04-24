const terms = ['Fall', 'Winter', 'Spring'] as const;
export type Term = typeof terms[number];

interface TermSelectorProps {
  selectedTerm: Term;
  setSelectedTerm: (term: Term) => void;
}

const TermSelector = ({ selectedTerm, setSelectedTerm }: TermSelectorProps) => (
  <div className="flex gap-4 p-4">
    {terms.map(term => (
      <label key={term} className="flex items-center gap-1 cursor-pointer">
        <input
          type="radio"
          name="term"
          value={term}
          checked={selectedTerm === term}
          onChange={() => setSelectedTerm(term)}
        />
        {term}
      </label>
    ))}
  </div>
);

export default TermSelector;
