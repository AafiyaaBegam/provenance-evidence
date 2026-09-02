# PROVENANCE — Evidence Intelligence Platform

> **Making AI conclusions traceable, explainable, and easier to inspect.**

PROVENANCE is an Evidence Intelligence Platform designed to make the relationship between a conclusion and its supporting evidence easier to explore.

The platform presents a structured provenance chain:

**CONCLUSION → ANALYSIS → DATASET → SOURCE RECORDS**

Instead of treating a conclusion as an isolated output, PROVENANCE allows users to explore the evidence trail behind it through an interactive interface.

---

## 🚀 Live Demo

🌐 **Live Application:**
https://provenance-evidence.netlify.app/

🎥 **Demo Video:**
https://youtu.be/Z1uS2vfkBYA

🏆 **Devpost:**
https://devpost.com/software/provenance-cuwy3f

---

## 💡 Problem

AI systems can generate conclusions quickly, but users may still struggle to understand:

* Where a conclusion came from
* Which evidence supports it
* Which source records are associated with that evidence
* How different evidence items relate to the conclusion
* How relevant or confident an evidence item is

PROVENANCE explores a user-friendly way to make this evidence trail visible.

---

## 🧠 Solution

PROVENANCE organizes evidence through a structured relationship:

```text
CONCLUSION
     ↓
  ANALYSIS
     ↓
  DATASET
     ↓
SOURCE RECORDS
```

Users can move from a high-level conclusion into the underlying evidence and source information.

---

## ✨ Key Features

### 📊 Interactive Dashboard

Explore conclusions and supporting evidence through a centralized interface.

### 🔎 Evidence Library

Browse evidence items and inspect their supporting information.

### 📚 Source Registry

Organize and explore source records associated with evidence.

### 🔗 Provenance Chain

Follow the relationship between:

**Conclusion → Analysis → Dataset → Source Records**

### 📋 Evidence Details

Inspect structured information such as:

* Evidence type
* Source
* Date
* Relevance
* Confidence
* Relationship to the conclusion

### 🖥️ Interactive Demo

Explore the complete evidence workflow through an interactive demonstration.

---

## 🛠️ Tech Stack

* React
* JavaScript
* Vite
* HTML
* CSS
* Netlify

---

## 🏗️ Architecture

The current prototype is structured around an evidence provenance workflow:

```text
                    ┌───────────────┐
                    │   CONCLUSION  │
                    └───────┬───────┘
                            ↓
                    ┌───────────────┐
                    │    ANALYSIS   │
                    └───────┬───────┘
                            ↓
                    ┌───────────────┐
                    │    DATASET    │
                    └───────┬───────┘
                            ↓
                    ┌───────────────┐
                    │ SOURCE RECORDS│
                    └───────────────┘
```

---

## 📸 Screenshots

Add screenshots of the major sections of the application here.

Recommended screenshots:

1. Dashboard
2. Evidence Library
3. Source Registry
4. Provenance Chain
5. Evidence Detail View

Example:

```text
docs/
├── dashboard.png
├── evidence-library.png
├── source-registry.png
└── provenance-chain.png
```

---

## ▶️ Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/aafiyaabegam/provenance-evidence.git
```

### 2. Open the project

```bash
cd provenance-evidence
```

### 3. Install dependencies

```bash
npm install
```

If PowerShell blocks `npm`, Windows users can use:

```bash
npm.cmd install
```

### 4. Start the development server

```bash
npm run dev
```

Or:

```bash
npm.cmd run dev
```

### 5. Build for production

```bash
npm run build
```

---

## 📁 Project Structure

```text
PROVENANCE/
├── public/
├── src/
├── package.json
├── package-lock.json
├── vite.config.js
├── LICENSE
└── README.md
```

---

## 🏆 Hackathon

PROVENANCE was developed for:

**Agentic Cinema: The Blockbuster Hackathon**

The project explores how evidence relationships can be presented in a way that makes AI-related conclusions easier to inspect and understand.

---

## 🌱 Future Scope

Future versions of PROVENANCE could extend the current prototype with:

* Automated evidence retrieval
* Real datasets and research sources
* Claim-level analysis
* Source freshness monitoring
* Contradiction analysis
* AI-assisted evidence reasoning
* Larger evidence graphs
* Real-time information sources

These are planned future capabilities and are **not represented as implemented features in the current prototype**.

---

## ⚠️ Demo Data Disclaimer

The current interactive demo uses clearly labeled **fictional/sample data** for demonstration purposes.

The sample conclusions and evidence records should not be interpreted as real or independently verified research findings.

---

## 📄 License

This project is licensed under the **MIT License**.

See the [LICENSE](LICENSE) file for details.

---

## 👩‍💻 Author

**AAFIYAA BEGAM M**

B.Tech Artificial Intelligence & Data Science

---

### 🔗 Project Links

🌐 **Live Demo:** https://provenance-evidence.netlify.app/
💻 **GitHub:** https://github.com/aafiyaabegam/provenance-evidence
🎥 **Demo Video:** https://youtu.be/Z1uS2vfkBYA
🏆 **Devpost:** https://devpost.com/software/provenance-cuwy3f
