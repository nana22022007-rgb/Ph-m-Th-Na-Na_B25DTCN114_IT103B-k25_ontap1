let songs = JSON.parse(localStorage.getItem("songs")) || [];
renderSong(songs);
function addSong() {
    let title = document.getElementById("title").value.trim();
    let artist = document.getElementById("artist").value.trim();
    if (title === "" || artist === "") {
        alert("Khong duoc de trong!");
        return;
    }

    let newSong ={
        id: songs.length+1,
        title:title,
        artist:artist,
    };
    songs.push(newSong);
    document.getElementById("title").value="";
    document.getElementById("artist").value="";
    localStorage.setItem("songs",JSON.stringify(songs));
    renderSong(songs);
}

function renderSong(songs) {
    
    let html ="";
    for (let i = 0; i < songs.length; i++) {
        html +=`
        <tr>
                <td>${songs[i].id}</td>
                <td>${songs[i].title}</td>
                <td>${songs[i].artist}</td>
                <td><button onclick="updateMode(${i})">Sửa</button><button onclick="deleteSong(${i})">Xóa</button></td>
            </tr>
        `
        
    }
    document.getElementById("songTable").innerHTML=html;
}
function updateMode(i) {
    document.getElementById("title").value=songs[i].title;
    document.getElementById("artist").value=songs[i].artist;
    document.getElementById("submitBtn").textContent="Cập nhật";
    document.getElementById("formTitle").textContent="Sửa bài hát";
    document.getElementById("submitBtn").onclick=function(){updateSong(i)};
}
function updateSong(i) {
    let title = document.getElementById("title").value.trim();
    let artist = document.getElementById("artist").value.trim();

    songs[i]={
        id:songs[i].id,
        title:title,
        artist:artist,
    }
    document.getElementById("title").value="";
    document.getElementById("artist").value="";
    localStorage.setItem("songs",JSON.stringify(songs));
    renderSong(songs);
    document.getElementById("submitBtn").textContent="Thêm";
    document.getElementById("submitBtn").onclick=function(){addSong()};

}

function deleteSong(i) {
    let ok = confirm("Ban co chac muon xoa k");
    if (ok) {
        songs.splice(i,1);
        localStorage.setItem(songs,JSON.stringify(songs));
        renderSong(songs);
    }else{
        alert("da huy thao tac");
    }
}
 function searchSong() {
    let search = document.getElementById("search").value.toLowerCase();
    let filtered = songs.filter(song=>song.title.toLowerCase().includes(search));
    renderSong(filtered);
 }
