function gantiBackgroundBerdasarkanJam() {
  const jam = new Date().getHours();
  let background = 'foto/sore.jpeg'; // default

  if (jam >= 5 && jam < 6) {
    background = 'foto/pagi.jpeg';
  } else if (jam >= 6 && jam < 16) {
    background = 'foto/siang.jpeg';
  } else if (jam >= 16 && jam < 18) {
    background = 'foto/sore.jpeg';
  } else {
    background = 'foto/malam.jpeg';
  }

  document.querySelector(".background").style.backgroundImage = `url('${background}')`;
}

function showWeather(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const apiKey = '71a709385242c0f2f64c9aa4a95cf7de'; // ganti dengan API key OpenWeather kamu

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=id&appid=${apiKey}`;

fetch(url)
.then(response => response.json())
.then(data => {
const kondisi = data.weather[0].main.toLowerCase();
const deskripsi = data.weather[0].description.toLowerCase();
const jam = new Date().getHours();
const isNight = jam >= 18 || jam < 6;

let iconPath = 'foto/berawan2.png';

if (deskripsi.includes('heavy') && deskripsi.includes('rain')) {
  iconPath = 'foto/heavy-rain.png'; // ikon hujan lebat
} else if (kondisi === 'clear') {
  iconPath = isNight ? 'foto/bulan.png' : 'foto/cerah.png';
} else if (kondisi === 'clouds') {
  iconPath = isNight ? 'foto/bulan-berawan.png' : 'foto/cerah-berawan2.png';
} else if (kondisi === 'rain') {
  iconPath = 'foto/hujan.png';
} else if (kondisi === 'thunderstorm') {
  iconPath = 'foto/hujan-petir.png';
} else if (kondisi === 'drizzle') {
  iconPath = 'foto/hujan-cerah.png';
} else if (['mist', 'haze', 'fog'].includes(kondisi)) {
  iconPath = 'foto/pagi-berkabut.png';
}

// Update konten HTML
document.querySelector('.kota').textContent = data.name;
document.querySelector('.suhu').textContent = Math.round(data.main.temp);
document.querySelector('.kondisi').textContent = data.weather[0].description;
document.querySelector('.jam').textContent = new Date().toLocaleTimeString('id-ID', {
hour: '2-digit',
minute: '2-digit'
});

// Tampilkan logo cuaca otomatis
document.querySelector('.awan').src = iconPath;
})
.catch(err => {
console.error('Gagal ambil data cuaca:', err);
alert("Data cuaca gagal dimuat.");
});
}

window.scroll(0,document.body.scrollHeight);
