
fetch("../components/navbar.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("navbar").innerHTML = data;
    });

// POPUP
function openPopup() {
    document.getElementById("popup").style.display = "block";
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}

// MOBILE MENU
function toggleMenu() {
    document.getElementById("navLinks").classList.toggle("active");
}

function closeMenu() {
    document.getElementById("navLinks").classList.remove("active");
}

// SUPABASE
const SUPABASE_URL = "https://rpvydremodieuspykbku.supabase.co";
const SUPABASE_KEY = "sb_publishable_OkHWD3M8eqX9cimNHRg2Xg_Qq7o_sd5";

async function getLeaderboard(column, ascending = false) {
    const url = `${SUPABASE_URL}/rest/v1/Players?select=username,${column}&${column}=gt.0&order=${column}.${ascending ? "asc" : "desc"}&limit=10`;

    const response = await fetch(url, {
        headers: {
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`
        }
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error("Failed to load leaderboard: " + response.status + " " + error);
    }

    return await response.json();
}

// LEADERBOARD DATA
let leaderboardData = {};

const leaderboardNames = {
    gun_score: "Gun Score",
    ball_score: "Ball Score",
    speedrun_time: "Speedrun",
    swings: "Swings"
};

// PREVENT HTML INJECTION
function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}
function formatSpeedrunTime(seconds) {
    const totalSeconds = Math.floor(Number(seconds));

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const remainingSeconds = totalSeconds % 60;

   return `${String(minutes + hours * 60).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")} min`;
}
// DISPLAY LEADERBOARD
function displayLeaderboard(board) {
    const container = document.getElementById("leaderboardResults");
    const title = document.getElementById("boardTitle");

    if (!container || !title) {
        console.error("Leaderboard HTML elements not found!");
        return;
    }

    title.textContent = leaderboardNames[board];

    const data = leaderboardData[board] || [];

    if (data.length === 0) {
        container.innerHTML = `
            <p class="leaderboard-loading">
                No players found yet.
            </p>
        `;
        return;
    }

    container.innerHTML = data.map((player, index) => {
        const rank = index + 1;

        let rankDisplay = rank;

        if (rank === 1) rankDisplay = "♛";
        else if (rank === 2) rankDisplay = "②";
        else if (rank === 3) rankDisplay = "③";

        return `
            <div class="leaderboard-entry rank-${rank}">
                <span class="leaderboard-rank">${rankDisplay}</span>
                <span class="leaderboard-player">${escapeHTML(player.username)}</span>
               <span class="leaderboard-score">
    ${board === "speedrun_time"
        ? formatSpeedrunTime(player[board])
        : escapeHTML(player[board])}
</span>
            </div>
        `;
    }).join("");
}


// BUTTONS
document.querySelectorAll(".leaderboard-tab").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".leaderboard-tab").forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        displayLeaderboard(button.dataset.board);
    });
});

// LOAD ALL LEADERBOARDS
async function loadLeaderboards() {
    const container = document.getElementById("leaderboardResults");

    try {
        const gun = await getLeaderboard("gun_score");
        const ball = await getLeaderboard("ball_score");
        const speedrun = await getLeaderboard("speedrun_time", true);
        const swings = await getLeaderboard("swings");

        leaderboardData = {
            gun_score: gun,
            ball_score: ball,
            speedrun_time: speedrun,
            swings: swings
        };

        displayLeaderboard("gun_score");

    } catch (error) {
        console.error(error);

        if (container) {
            container.innerHTML = `
                <p class="leaderboard-loading">
                    Failed to load leaderboards.
                </p>
            `;
        }
    }
}

loadLeaderboards();
