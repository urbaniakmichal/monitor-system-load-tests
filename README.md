# 🚀 Monitor System - Performance & Load Testing

A dedicated performance and load testing workspace for the **Monitor System** microservice infrastructure. This repository utilizes **k6** to simulate realistic traffic, stress-test application thresholds, and ensure system stability under heavy loads.

---

## 📋 Table of Contents
- [About the Project](#-about-the-project)
- [Prerequisites](#-prerequisites)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Running Load Tests](#-running-load-tests)
- [Test Scenarios & Thresholds](#-test-scenarios--thresholds)
- [Integration with Monitoring](#-integration-with-monitoring)

---

## 🎯 About the Project

This project evaluates the performance of the core Go-based backend (`monitor-system`) by executing automated load scenarios. It tracks critical performance indicators such as:
* HTTP request duration ($p(95)$ latency).
* Error rates under concurrency.
* Resource utilization (CPU, memory, and Go goroutines) alongside Prometheus and Grafana.

---

## 📦 Prerequisites

Ensure you have the following installed on your machine:
* [Node.js](https://nodejs.org/) (for managing TypeScript types and running scripts if needed)
* [k6](https://k6.io/) (Grafana k6 load testing tool)
  ```bash
  # Windows (via winget)
  winget install k6 --source winget

  # macOS (via Homebrew)
  brew install k6
  ```

---

## 📂 Project Structure

```text
monitor-system-load-tests/
├── tests/
│   └── load-test.js       # Main k6 performance test script
├── node_modules/          # TypeScript type definitions for k6
├── package.json           # Project dependencies & configuration
└── README.md              # Project documentation
```

---

## 🚀 Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/urbaniakmichal/monitor-system-load-tests.git
   cd monitor-system-load-tests
   ```

2. **Ensure your target service is running:**
   Make sure the `monitor-system` backend is up and running locally (default endpoint: `http://localhost:8080`).

---

## 🏃‍♂️ Running Load Tests

To execute the performance test suite against your local or staging environment, run:

```bash
k6 run load-tests/load-test.js
```

---

## 📊 Test Scenarios & Thresholds

The current test scenario (`load-test.js`) executes in three progressive stages:
1. **Ramp-up:** Scaled up to 10 virtual users (VUs) over 30 seconds (Warm-up).
2. **Peak Load:** Maintained at 50 concurrent VUs for 1 minute.
3. **Ramp-down:** Gracefully scaled down to 0 VUs over 15 seconds.

### Enforced Thresholds:
* **Latency ($p(95)$):** 95% of requests must complete in **under 500ms**.
* **Error Rate:** Failed requests must remain **below 1%** (`rate < 0.01`).

---

## 📈 Integration with Monitoring

While running the `k6` script, open your **Grafana Dashboard** (`http://localhost:3000`) to monitor real-time system metrics:
* Active Go Goroutines
* Resident Memory (RAM) usage
* CPU usage rate

---

## 📄 License

This project is licensed under the MIT License. Feel free to use and modify it for your infrastructure needs.