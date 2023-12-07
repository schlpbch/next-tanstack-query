# Abou

This is a simple which uses `useQuery` and `useMutation` of
[tanstack/query](https://tanstack.com/query/latest), formerly known as
`react-query`.

To test react-query as simple API using `json-server` has been added. Please
start with

```bash
npm run mock-api
```

The api has a delay of 1000 ms to simulate latency of a service.

Then run the development server which serves the app.

```bash
npm run dev
```

## React Query Devtools

The React Query Devtools can be used to simulate the different states of a
request, such as _loading_, _error_ or _success_.
