# Blue Dot Economy DPGs Fine-Tuning Dataset

This repository contains custom fine-tuning data for training an Ollama model on the **Blue Dot Economy DPGs** concept.

The dataset is written in **JSONL format** and can be used to fine-tune models such as `llama3` using Ollama.

---

# Project Purpose

The dataset teaches the model about:

- Local discovery failure
- Digital Public Infrastructure (DPI)
- Signal DPG
- Aggregator DPG
- Ecosystem Facilitator DPG
- Schema-driven configuration
- Employment, tourism, and welfare use cases
- Interoperability and network contracts
- Pilot outcomes from Ghaziabad and Dharwad

---

# Dataset Structure

Each line in the `.jsonl` file must contain a valid JSON object with:

- `prompt` → User question or instruction
- `completion` → Expected model response

Example:

```json
{"prompt":"What is the Signal DPG?","completion":"The Signal DPG enables individuals to register, create profiles, discover opportunities or services, and track interactions."}