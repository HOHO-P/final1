let bgColors = ["#67BAD6", "#D3D0CB", "#9CAFB7", "#E6D3B3", "#B0C4B1"];
let textColors = ["#FAFAFA", "#3E3E3E", "#1C1C1C", "#2F2F2F", "#1A1A1A"];
let sections = [
  { title: "首頁" },
  { title: "自我介紹" },
  { title: "作品集" },
  { title: "測驗卷" },
  { title: "教學影片" }
];
let font;
let balls = []; // 儲存球球的陣列

function preload() {
  font = loadFont('assets/NotoSerifTC-Regular.otf'); // 確保字型檔案存在於 assets 資料夾中
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 20; i++) { // 初始化 20 顆球球
    balls.push(new Ball(random(width), random(height), random(10, 30)));
  }
}

// 新增選單
const menu = createElement('ul');
menu.style('position', 'absolute');
menu.style('top', '10px');
menu.style('right', '10px');
menu.style('list-style', 'none');
menu.style('padding', '0');
menu.style('margin', '0');
menu.style('display', 'flex'); // 改為橫列排列
menu.style('gap', '15px'); // 增加項目間距

const menuItems = ['首頁', '自我介紹', '作品集', '測驗卷', '教學影片', 'HACK MD筆記'];
menuItems.forEach(item => {
  const li = createElement('li');
  if (item === '作品集') {
    const link = createA('https://hoho-p.github.io/20250317/', '第一週', '_blank');
    li.child(link);
  } else {
    li.html(item);
  }
  menu.child(li);
});

function draw() {
  let section = floor(window.scrollY / 800);
  section = constrain(section, 0, bgColors.length - 1);

  if (section === 0) { // 首頁區段
    clear(); // 清除畫布，避免殘影
    background(bgColors[section]);

    // 繪製並更新球球
    for (let ball of balls) {
      ball.move();
      ball.display();
    }
  } else if (section === 1) { // 自我介紹區段
    background(0);

    // 渲染影片到球體
    push();
    rotateY(PI); // 讓影片方向正確
    texture(video);
    sphere(500, 100, 100);
    pop();

    // 確保影片正在播放
    if (!video.elt.playing) {
      video.play();
    }

    // 新增自我介紹文字，確保顯示在最上層
    push();
    fill(255);
    textFont(font);
    textSize(48);
    textAlign(CENTER, CENTER);
    translate(width / 2, height / 2); // 修正文字位置到畫布中心
    text("大家好!我是hoho", 0, 0);
    pop();
  } else {
    clear(); // 清除畫布，避免殘影
    background(bgColors[section]);
    fill(textColors[section]);

    textFont(font);
    textSize(36);
    textAlign(CENTER, CENTER);
    text(sections[section].title, width / 2, height / 2);
  }
}

// 定義 Ball 類別
class Ball {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.xSpeed = random(-2, 2);
    this.ySpeed = random(-2, 2);
    this.color = color(random(255), random(255), random(255));
  }

  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    // 碰到邊界反彈
    if (this.x < 0 || this.x > width) this.xSpeed *= -1;
    if (this.y < 0 || this.y > height) this.ySpeed *= -1;
  }

  display() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.r * 2);
  }
}
