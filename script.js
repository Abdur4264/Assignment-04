document.addEventListener("DOMContentLoaded",() => {
    const cards = document.querySelector("[data-status]");
    const totalCountEl = document.querySelector(".total-count");
    const interviewCountEL = document.querySelector(".interview-count");
    const rejectedCountEl = document.querySelector(".rejected-count");
    const jobCountEL = document.querySelector(".job-count");

    const filterAllBtn = document.getElementById("filter-all");
    const filterInterviewBtn = document.getElementById("filter-interview");
    const filterRejectedBtn = document.getElementById("filter-rejected");

    const cardContainer = document.querySelector(".card-grid").parentElement;

    let currentFilter = "all";

    const emptyState = document.createElement("div");
    emptyState.className = "text-center py-20 text-[#94A3BB]"
    emptyState.innerHTML = `<i class="fa-regular fa-folder-open text-6xl mb-4"></i>
        <p class="text-lg font-medium">No jobs found</p>`;

    function updateCounts(){
        const allCards = document.querySelectorAll("[data-status]");
        const interViewCards = document.querySelectorAll('[data-status="interview]');
        const rejectedCards = document.querySelectorAll('[data-status="rejected"]');

        totalCountEl.textContent = allCards.length;
        interviewCountEL.textContent = interViewCards.length;
        rejectedCountEl.textContent = rejectedCards.length;

        if (currentFilter === "all"){
            jobCountEL.textContent=`${allCards.length} jobs`;
           }  else if (currentFilter==="interview"){
                jobCountEL.textContent = `${interViewCards.length}jobs`;

            }else {
                jobCountEL.textContent = `${rejectedCards.length} jobs`;
            }

    function applyFilter(filter){
        currentFilter = filter;
        let visibleCount = 0;

        document.querySelectorAll("[data-status]").forEach(card=> {
            const status = card.getAttribute("data-status");

            if (filter === "all"){
                card.style.display = "block";
                visibleCount++;
            } else if (status === filter){
                card.style.display = "block";
                visibleCount++;
            } else {
                card.style.display="none";
            }
        });
        
    if (visibleCount === 0){
        cardContainer.appendChild(emptyState);
    } else{
        if (cardContainer.contains(emptyState)){
            cardContainer.removeChild(emptyState);
        }
    }

    updateCounts();

    }        


    
       

        


        
    }
})