# Todo App

## 기능 요구 사항

- 문자열로 된 todo 항목 추가
- 다른 todo 참조
- 목록 조회
  - 작성 일자, 최종 수정 일자, 내용, 참조하고 있는 todo들의 id 표시
  - 페이지 네이션 구현
- todo 수정
- todo 삭제
- 완료 - 미완료 처리
  - 참조하고 있는 todo들이 모두 완료 상태가 아니라면 todo를 완료 처리 불가

## Run

### Run dev-API Server & dev Web Server in concurrently

```bash
npm run dev
# or
yarn dev
```

### Run dev-API Server & dev Web Server separately

First, Run dev-API Server

```bash
npm run api
# or
yarn api
```

Then,

```bash
npm run serve
# or
yarn serve
```

## 사용법

### 참조

`@` 키워드를 이용하여 아이디 참조

e.g. 3번 id 참조

```plain
Todo @3
```

### 검색

- 각 검색 조건은 조합 가능
- 검색어 없이 검색하면 모든 항목 노출

#### 완료/미완료 검색
`is:complete` 혹은 `is:incomplete` 키워드를 사용하여 검색 가능.

e.g. 완료 된 "할 일" 타이틀을 가진 항목 검색
```plain
is:complete 할 일
```

e.g. 미완료 된 모든 항목 검색
```plain
is:incomplete
```

#### 등록일 별 검색

`reg:` 키워드를 이용하여 `YYYY`, `YYYY-MM`, `YYYY-MM-DD` 형식으로 검색 가능 <br>
(`-`는 `.`를 사용하거나 생략 가능)

e.g. 2020년 3월에 등록된 모든 항목 검색
```plain
reg:2020-03
// or
reg:2020.03
// or
reg:202003
```

e.g. 2020년 3월 27일에 등록된 "할 일" 타이틀을 가진 항목 검색
```plain
reg:2020-03 할 일
// or
reg:2020.03 할 일
// or
reg:202003 할 일
```

## 개인적인 피드백

- 지난 두 주 동안 6회의 Tech Interview 및 Tea Time, 채용 과제들이 연달아 발생하고
  AOA 영상 제작 일정까지 겹치면서 몰입할 시간이 너무 부족했다.
- 빠르게 REST API를 구현해야 해서 가장 빠르게 해볼 수 있는게 Json-Server라고 판단하고
  시도해봤는데 처음 시도해보는 툴이라 rewrite를 만드는데 초반에 시간을 좀 잡아먹고
  querystring형태로 방향을 틀어버렸다.
- 짧은 시간에 해결하려다보니 설계가 제대로 이루어지지 않아 뒤에가서 설계 miss를 발견했을
  때는 이미 늦었다. 설계는 언제나 중요하다
- 몇 군데 비효율적이라고 생각되는 코드가 있다. 더 효율적으로 작성하는 방법을 고민해 볼
  필요가 있다.