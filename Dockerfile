# base image 설정(as build 로 완료된 파일을 밑에서 사용할 수 있다.)
FROM docker.io/library/node:16-alpine as build

# 컨테이너 내부 작업 디렉토리 설정
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# app dependencies
# 컨테이너 내부로 package.json과 yarn.lock 파일들을 복사
COPY package*.json ./
COPY yarn.lock ./

# package.json 및 yarn.lock 파일에 명시된 의존성 패키지들을 설치
RUN yarn install

# 호스트 머신의 현재 디렉토리 파일들을 컨테이너 내부로 전부 복사
COPY . ./

# build app
RUN yarn build

# prod environment
FROM docker.io/library/nginx:stable-alpine

ENV APP_ENDPOINT "10.16.16.41:31371"

# 이전 빌드 단계에서 빌드한 결과물을 /usr/share/nginx/html 으로 복사한다.
COPY --from=build /app/build /usr/share/nginx/html

# 기본 nginx 설정 파일을 삭제한다. (custom 설정과 충돌 방지)
RUN rm /etc/nginx/conf.d/default.conf

# custom 설정파일을 컨테이너 내부로 복사한다.
COPY nginx/nginx.conf /etc/nginx/conf.d

VOLUME [ "/etc/nginx" ]
VOLUME [ "/var" ]

# 컨테이너의 80번 포트를 열어준다.
EXPOSE 80

EXPOSE 443

# nginx 서버를 실행하고 백그라운드로 동작하도록 한다.
ENTRYPOINT sed -i "s/APP_ENDPOINT/$APP_ENDPOINT/g" "/etc/nginx/conf.d/nginx.conf" && nginx -g 'daemon off;'