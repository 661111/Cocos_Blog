<template>
<title>*404*无权访问</title>
  <div class="noise"></div>
  <div class="overlay"></div>
  <img src="https://github.githubassets.com/images/mona-loading-default.gif"/>
<div class="terminal">
  <h1>
    ERROR
    <span class="errorcode">404</span>
    <span>
      <small>权限不足</small>
    </span>
  </h1>
  <p class="output">您的权限不足，请确认您拥有足够的权限访问敏感资料。</p>
  <p class="output">若您确认并无相关权限，还请
  <a href="Index">返回首页</a>
  </p>
  <p class="output">
    <small>：）祝 君 好 运</small>
  </p>
</div>
</template>

<script>

export default {
  name: "404"
}
</script>

<style scoped>
@import 'https://fonts.googleapis.com/css?family=Inconsolata';

html {
  max-height: 100vh;
}

body {
  box-sizing: border-box;
  height: 100vh;
  background-color: #041607;
  background-image: radial-gradient(#11581E, #041607), url("https://media.giphy.com/media/oEI9uBYSzLpBK/giphy.gif");
  background-repeat: no-repeat;
  background-size: cover;
  font-family: 'Inconsolata', Helvetica, sans-serif;
  font-size: 1.5rem;
  color: rgba(128, 255, 128, 0.8);
  text-shadow:
      0 0 1ex rgba(51, 255, 51, 1),
      0 0 2px rgba(255, 255, 255, 0.8);
}

.noise {
  pointer-events: none;
  position: absolute;
  width: 100%;
  height: 100vh;
  background-image: url("https://media.giphy.com/media/oEI9uBYSzLpBK/giphy.gif");
  background-repeat: no-repeat;
  background-size: cover;
  z-index: -1;
  opacity: .02;
}

.overlay {
  pointer-events: none;
  position: absolute;
  width: 100%;
  height: 100vh;
  background:
      repeating-linear-gradient(
          180deg,
          rgba(0, 0, 0, 0) 0,
          rgba(0, 0, 0, 0.3) 50%,
          rgba(0, 0, 0, 0) 100%);
  background-size: auto 4px;
  z-index: 1;
}

.overlay::before {
  content: "";
  pointer-events: none;
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
      0deg,
      transparent 0%,
      rgba(32, 128, 32, 0.2) 2%,
      rgba(32, 128, 32, 0.8) 3%,
      rgba(32, 128, 32, 0.2) 3%,
      transparent 100%);
  background-repeat: no-repeat;
  animation: scan 7.5s linear 0s infinite;
}

@keyframes scan {
  0%        { background-position: 0 -100vh; }
  35%, 100% { background-position: 0 100vh; }
}

.terminal {
  box-sizing: inherit;
  position: absolute;
  height: 100vh;
  width: 1000px;
  max-width: 100%;
  padding: 4rem;
  text-transform: uppercase;
}

.output {
  color: rgba(128, 255, 128, 0.8);
  text-shadow:
      0 0 1px rgba(51, 255, 51, 0.4),
      0 0 2px rgba(255, 255, 255, 0.8);
}

.output::before {
  content: "> ";
}



a {
  color: #fff;
  text-decoration: none;
}

a::before {
  content: "[";
}

a::after {
  content: "]";
}

.errorcode {
  color: white;
}
small{
  text-tranform: lowercase;
  font-size: 20px;
  color: lime;
}
</style>