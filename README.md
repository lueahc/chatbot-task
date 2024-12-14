## CHATBOT API

- JWT 기반 사용자 권한 인증
- 외부 API를 통해 사용자의 질문에 대한 적절한 응답 생성
- Swagger를 이용한 문서화 및 테스트 가능 환경 제공

## Tech Stack

- **백엔드**: Koa, TypeScript
- **외부 API**: Google Custom Search API, OpenAI API
- **문서화**: Swagger

## Running the App

### 1. Google Custom Search API 설정

1. [Google Cloud Console](https://console.cloud.google.com/)에 로그인 후 프로젝트 생성
2. `API 및 서비스 > 라이브러리`에서 "Custom Search JSON API" 검색 후 활성화
3. `API 및 서비스 > 사용자 인증 정보`에서 API 키 생성
4. [Google Custom Search Engine](https://cse.google.com/cse/all)에 접속해 새로운 검색 엔진 생성
5. URL에 포함된 CSE ID 복사

### 2. .env 파일 생성

```bash
OPENAI_API_KEY=
GOOGLE_API_KEY=
GOOGLE_CSE_ID=
JWT_SECRET_KEY=
JWT_EXPIRES_IN=
PORT=
```

### 3. 설치 후 실행

```bash
$ npm install
$ npm run start
```
