import http from 'k6/http';

export const options = {
    scenarios: {
        shared_iter_scenario: {
            executor: 'shared-iterations',
            vus: 10,
            iterations: 100,
            startTime: '0s',
        },
        per_vu_scenario: {
            executor: 'per-vu-iterations',
            vus: 10,
            iterations: 10,
            startTime: '10s',
        },
    },
    thresholds: {
        http_req_failed: ['rate<0.01'],
        http_req_duration: ['p(99)<1000'],
    },
};

export default function () {
    const res = http.get('http://localhost:8080/api/v1/metrics');
    const body = res.json();

    check(res, {
        'status 200': (r) => r.status === 200,
        'message is correct': (r) => body.message === "get all metrics successfully",
        'data field is array': () => Array.isArray(body.data),
    });
}