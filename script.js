const board=document.querySelector('#board'),status=document.querySelector('#status'),wins=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
const skins=[
 {id:'classic',name:'Классика',mark:'✕',note:'Стартовый стиль',price:0,x:'#54e2ff',o:'#ff76bb'},
 {id:'neon',name:'Неон-шторм',mark:'⚡',note:'Электрическая искра',price:30,x:'#c88bff',o:'#9dff7d'},
 {id:'solar',name:'Солнечный дуэт',mark:'☀',note:'Тёплое сияние',price:60,x:'#ffd45d',o:'#ff8e55'},
 {id:'ocean',name:'Океан',mark:'🌊',note:'Волны глубины',price:25,x:'#30d5ff',o:'#1769e0'},
 {id:'sakura',name:'Сакура',mark:'🌸',note:'Лепестки весны',price:35,x:'#ff9dc8',o:'#d960a9'},
 {id:'forest',name:'Лесной дух',mark:'🌿',note:'Энергия чащи',price:40,x:'#83ef8c',o:'#2fab67'},
 {id:'lava',name:'Лава',mark:'🌋',note:'Пылающее ядро',price:45,x:'#ff553c',o:'#ffb000'},
 {id:'ice',name:'Ледяной пик',mark:'❄',note:'Северный холод',price:45,x:'#b6f7ff',o:'#7d9eff'},
 {id:'cosmos',name:'Космос',mark:'🪐',note:'Далёкая орбита',price:50,x:'#bb8cff',o:'#5bd3ff'},
 {id:'royal',name:'Королевский',mark:'♛',note:'Золотая корона',price:70,x:'#ffd34e',o:'#b07aff'},
 {id:'pixel',name:'Пиксель',mark:'👾',note:'Ретро-аркада',price:35,x:'#5affbd',o:'#ff6fcb'},
 {id:'candy',name:'Карамель',mark:'🍬',note:'Сладкий заряд',price:30,x:'#ff8dbf',o:'#8ee9ff'},
 {id:'cyber',name:'Киберпанк',mark:'🤖',note:'Город будущего',price:65,x:'#00f0ff',o:'#ff3bac'},
 {id:'gold',name:'Золотой век',mark:'🏆',note:'Блеск чемпиона',price:90,x:'#ffe76a',o:'#ffac39'},
 {id:'shadow',name:'Тень',mark:'🌑',note:'Ночной охотник',price:55,x:'#9f9ab7',o:'#5a4d74'},
 {id:'rainbow',name:'Радуга',mark:'🌈',note:'Семь оттенков',price:60,x:'#ff7087',o:'#7cceff'},
 {id:'jungle',name:'Джунгли',mark:'🦜',note:'Тропический ритм',price:50,x:'#bdff62',o:'#27cb82'},
 {id:'ruby',name:'Рубин',mark:'💎',note:'Красный кристалл',price:75,x:'#ff4b68',o:'#a10039'},
 {id:'emerald',name:'Изумруд',mark:'💚',note:'Зелёный самоцвет',price:75,x:'#5dffc0',o:'#00a06a'},
 {id:'amethyst',name:'Аметист',mark:'🔮',note:'Магический камень',price:75,x:'#e18bff',o:'#7d58e5'},
 {id:'firefly',name:'Светлячок',mark:'✨',note:'Искры в темноте',price:40,x:'#fff36a',o:'#a3ff70'},
 {id:'moon',name:'Лунный свет',mark:'🌙',note:'Серебряная ночь',price:55,x:'#e9e8ff',o:'#a6b0ff'},
 {id:'coffee',name:'Кофейный',mark:'☕',note:'Бодрый стиль',price:35,x:'#f5ba78',o:'#9e5a3c'},
 {id:'music',name:'Мелодия',mark:'🎵',note:'Ритм арены',price:45,x:'#ba9bff',o:'#ff7bbc'},
 {id:'toxic',name:'Токсик',mark:'☣',note:'Опасное свечение',price:70,x:'#d3ff00',o:'#45d33a'},
 {id:'angel',name:'Ангел',mark:'😇',note:'Небесный свет',price:80,x:'#e4f9ff',o:'#ffe5a3'},
 {id:'dragon',name:'Дракон',mark:'🐉',note:'Древнее пламя',price:100,x:'#ff754f',o:'#8a3eff'},
 {id:'plasma',name:'Плазма',mark:'🧪',note:'Чистая энергия',price:85,x:'#24f5db',o:'#448cff'},
 {id:'glitch',name:'Глитч',mark:'📺',note:'Ошибка реальности',price:95,x:'#fa4ab7',o:'#50fbff'},
 {id:'legend',name:'Легенда',mark:'⭐',note:'Награда мастера',price:120,x:'#fff076',o:'#ff9e46'},
 {id:'phoenix',name:'Феникс',mark:'🦅',note:'Возрождение огня',price:150,x:'#ff6b3b',o:'#ffca4d'},
 {id:'void',name:'Бездна',mark:'🕳',note:'Секретный стиль',price:200,x:'#8a66ff',o:'#ee46ff'}
];
let state=JSON.parse(localStorage.getItem('ticTacArena'))||{coins:0,xWins:0,oWins:0,owned:['classic'],xSkin:'classic',oSkin:'classic'},cells,turn,playing;
const skin=id=>skins.find(s=>s.id===id),save=()=>localStorage.setItem('ticTacArena',JSON.stringify(state));
function profile(){coins.textContent=state.coins;xWins.textContent=state.xWins;oWins.textContent=state.oWins;xPreview.style.color=skin(state.xSkin).x;oPreview.style.color=skin(state.oSkin).o}
function shop(){skinShop.replaceChildren(...skins.map(s=>{let n=skinTemplate.content.cloneNode(true),own=state.owned.includes(s.id),b=n.querySelector('button'),selected=state.xSkin===s.id&&state.oSkin===s.id;n.querySelector('.skin-art').textContent=s.mark;n.querySelector('.skin-art').style.color=s.x;n.querySelector('h3').textContent=s.name;n.querySelector('p').textContent=s.note;b.textContent=own?(selected?'Выбран для обоих':'Выбрать'):`Купить · ${s.price} 🪙`;b.className=own?'':'locked';b.disabled=selected;b.onclick=()=>{if(!own){if(state.coins<s.price){status.textContent=`Не хватает ${s.price-state.coins} 🪙`;return}state.coins-=s.price;state.owned.push(s.id)}state.xSkin=state.oSkin=s.id;save();profile();shop()};return n}))}
function start(){cells=Array(9).fill('');turn='X';playing=true;board.replaceChildren(...cells.map((_,i)=>{let b=document.createElement('button');b.className='cell';b.type='button';b.setAttribute('role','gridcell');b.onclick=()=>move(i);return b}));status.textContent='Ход крестиков'}
function move(i){if(!playing||cells[i])return;cells[i]=turn;let b=board.children[i],s=skin(turn==='X'?state.xSkin:state.oSkin);b.textContent=turn==='X'?'✕':'◯';b.style.color=turn==='X'?s.x:s.o;b.style.textShadow=`0 0 24px ${b.style.color}`;b.disabled=true;let line=wins.find(([a,c,d])=>cells[a]&&cells[a]===cells[c]&&cells[a]===cells[d]);if(line){playing=false;state.coins+=15;turn==='X'?state.xWins++:state.oWins++;line.forEach(n=>board.children[n].classList.add('win'));status.textContent=`${turn==='X'?'Крестики':'Нолики'} побеждают! +15 🪙`;save();profile();shop();return}if(cells.every(Boolean)){playing=false;status.textContent='Ничья — награды не будет';return}turn=turn==='X'?'O':'X';status.textContent=`Ход ${turn==='X'?'крестиков':'ноликов'}`}
restart.onclick=start;profile();shop();start();
