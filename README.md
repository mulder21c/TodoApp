# KakaoIX 프론트엔드 과제

## 기능 요구 사항

- 사용자는 문자열로 된 todo 항목을 추가할 수 있다.
- todo는 다른 todo들을 참조할 수 있다.
- 사용자는 todo 목록을 조회할 수 있다.
  - 작성 일자, 최종 수정 일자, 내용, 참조하고 있는 todo들의 id가 표시되어야 한다.
  - 페이지 네이션 구현 (가산점)
- 사용자는 todo를 수정할 수 있다.
- 사용자는 todo를 삭제할 수 있다.
- 사용자는 todo를 완료 또는 미완료로 상태를 변경할 수 있다.
  - 참조하고 있는 todo들이 모두 완료 상태가 아니라면 todo를 완료할 수 없다.

## 조건 및 필수 사항
- `@` 키워드로 다른 Item 참조
- 참조하는 Item이 있을 경우, 해당 Item이 완료되어야만 현재 Item을 완료 처리 가능
- 작성일과 최종 수정일 출력
- pagination 구현
- 검색 구현 (text, 완료여부, 날짜 등)

## UI 예시
- 완료 상태 표기: checked, line-through
- checked/unchecked button, title, delete button ...


## 가산점
- React
- Unit Test
- Backup/Restore (file download/upload or Cloud Backup)
- 검색 결과 필터링 / 정렬