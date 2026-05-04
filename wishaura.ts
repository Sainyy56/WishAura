import React, { useState } from 'react';
import Header from './components/Header';
import InputSection from './components/InputSection';
import Results from './components/Results';
import Loading from './components/Loading';
import './App.css';

function App() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateGiftIdeas = async (description, budget, traits) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:3001/api/generate-gifts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description,
          budget,
          traits
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate gift ideas');
      }
      
      const data = await response.json();
      setResults(data);
    } catch (error) {
      setError(error.message);
      // Fallback to simulated data
      setResults(simulateAPIResponse(description, budget, traits));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <Header />
      <InputSection onGenerate={generateGiftIdeas} />
      {error && <div className="error-message">{error}</div>}
      {loading && <Loading />}
      {results && <Results data={results} />}
    </div>
  );
}

// Simulated data function (same as in your HTML)
function simulateAPIResponse(description, budget, traits) {
  // ... (same implementation as in your HTML file)
}

export default App;




import React, { useState } from 'react';
import PersonalityPad from './PersonalityPad';

const InputSection = ({ onGenerate }) => {
  const [description, setDescription] = useState("It's my best friend's 21st birthday, she loves books, coffee, and anime, we've been friends since school.");
  const [budget, setBudget] = useState(2500);
  const [selectedTraits, setSelectedTraits] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate(description, budget, selectedTraits);
  };

  return (
    <div className="card">
      <h2><i className="fas fa-magic"></i> Describe the Person & Occasion</h2>
      <div className="input-section">
        <div>
          <textarea 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Example: It's my best friend's 21st birthday, she loves books, coffee, and anime, we've been friends since school..."
          />
          
          <h3 style={{marginTop: '1.5rem'}}>
            <i className="fas fa-user-circle"></i> Select Personality Traits
          </h3>
          <PersonalityPad 
            selectedTraits={selectedTraits}
            setSelectedTraits={setSelectedTraits}
          />
        </div>
        <div className="budget-section">
          <h2><i className="fas fa-indian-rupee-sign"></i> Set Your Budget</h2>
          <div className="slider-container">
            <input 
              type="range" 
              min="500" 
              max="10000" 
              value={budget}
              onChange={(e) => setBudget(parseInt(e.target.value))}
              className="slider" 
            />
            <div className="budget-amount">₹{budget}</div>
          </div>
          <p>AI will recommend gifts within your budget range (₹500 - ₹10,000)</p>
        </div>
      </div>
      
      <div className="center">
        <button onClick={handleSubmit} className="btn">
          <i className="fas fa-wand-magic-sparkles"></i> Generate Gift Ideas
        </button>
      </div>
    </div>
  );
};

export default InputSection;


