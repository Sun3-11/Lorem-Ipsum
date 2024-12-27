import { useState } from "react";
import { englishText, arabicText } from "./data";
import { nanoid } from "nanoid";

const App = () => {
  const [count, setCount] = useState(1);
  const [textData, setTextData] = useState([]);
  const [language, setLanguage] = useState("en");
  const [type, setType] = useState("random");

  const handleSubmit = (e) => {
    e.preventDefault();
    let amount = parseInt(count);
    let filteredText = [];

    //filter the text by type
    if (language === "en") {
      filteredText = englishText[type];
    } else {
      filteredText = arabicText[type];
    }

    setTextData(filteredText.slice(0, amount));
  };

  const handleLanguageSwitch = () => {
    setLanguage((prevLang) => (prevLang === "en" ? "ar" : "en"));
  };

  return (
    <section className="section-center">
      <h4>
        {language === "en"
          ? "Tired of boring lorem ipsum?"
          : "هل سئمت من النصوص المملة؟"}
      </h4>

      <form
        className="lorem-form "
        dir={language === "en" ? " ltr" : language === "ar" ? "rtl" : ""}
        onSubmit={handleSubmit}
      >
        <label htmlFor="amount">
          {language === "en" ? "Paragraphs:" : " الفقرات:"}
        </label>
        <input
          type="number"
          name="amount"
          id="amount"
          min="1"
          step="1"
          max="8"
          value={count}
          onChange={(e) => setCount(e.target.value)}
        />

        <label htmlFor="type">{language === "en" ? " Type:" : " النوع:"}</label>
        <select
          name="type"
          id="type"
          className="select"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="random">
            {language === "en" ? "Random" : "عشوائي"}
          </option>
          <option value="scientific">
            {language === "en" ? "Scientific" : "علمي"}
          </option>
          <option value="motivational">
            {language === "en" ? "Motivational" : "تحفيزي"}
          </option>
        </select>

        <button className="btn" type="submit">
          {language === "en" ? "Generate" : "إنشاء"}
        </button>
        <button onClick={handleLanguageSwitch} className="btn">
          {language === "en" ? "ع" : "E"}
        </button>
      </form>

      <article className="lorem-text" lang={language}>
        {textData.map((item) => {
          return (
            <div key={nanoid()}>
              <p>{item}</p>
            </div>
          );
        })}
      </article>
    </section>
  );
};

export default App;
