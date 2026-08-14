(function () {
  "use strict";

  const state = {
    animal: "cat",
    search: "",
    statuses: new Set(),   // FATAL | TOXIC | SAFE | UNVERIFIED
    tags: new Set(),       // SEASONAL | DRY-FRIENDLY | TJ
    plants: [],
  };

  const drawerEl = document.getElementById("drawer");
  const resultCountEl = document.getElementById("result-count");
  const emptyStateEl = document.getElementById("empty-state");
  const specimenCountEl = document.getElementById("specimen-count");
  const cardTemplate = document.getElementById("card-template");
  const clearBtn = document.getElementById("clear-filters");

  // -------- classify a per-animal toxicity string into a status bucket --------
  function classify(text) {
    if (!text) return "UNVERIFIED";
    const t = text.trim();
    if (/^FATAL/i.test(t)) return "FATAL";
    if (/^Non-toxic/i.test(t)) return "SAFE";
    if (/^Toxic/i.test(t)) return "TOXIC";
    return "UNVERIFIED";
  }

  const STATUS_LABEL = {
    FATAL: "Fuck No",
    TOXIC: "Toxic",
    SAFE: "Safe",
    UNVERIFIED: "Unverified",
  };

  // -------- fetch data --------
  fetch("data.json")
    .then((r) => r.json())
    .then((data) => {
      state.plants = data;
      specimenCountEl.textContent = data.length;
      render();
    })
    .catch((err) => {
      drawerEl.innerHTML =
        '<p style="color:#F1EAD9;font-family:sans-serif;padding:2rem;">Could not load data.json. If you\'re opening this file directly, run a local server (see README) — browsers block fetch() on file:// URLs.</p>';
      console.error(err);
    });

  // -------- wire up controls --------
  document.getElementById("search").addEventListener("input", (e) => {
    state.search = e.target.value.trim().toLowerCase();
    render();
  });

  document.querySelectorAll(".animal-toggle__btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".animal-toggle__btn")
        .forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      state.animal = btn.dataset.animal;
      render();
    });
  });

  document.querySelectorAll("#status-chips .chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      const s = chip.dataset.status;
      if (state.statuses.has(s)) {
        state.statuses.delete(s);
        chip.setAttribute("aria-pressed", "false");
      } else {
        state.statuses.add(s);
        chip.setAttribute("aria-pressed", "true");
      }
      render();
    });
  });

  document.querySelectorAll("#tag-chips .chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      const t = chip.dataset.tag;
      if (state.tags.has(t)) {
        state.tags.delete(t);
        chip.setAttribute("aria-pressed", "false");
      } else {
        state.tags.add(t);
        chip.setAttribute("aria-pressed", "true");
      }
      render();
    });
  });

  clearBtn.addEventListener("click", () => {
    state.search = "";
    state.statuses.clear();
    state.tags.clear();
    document.getElementById("search").value = "";
    document
      .querySelectorAll(".chip")
      .forEach((c) => c.setAttribute("aria-pressed", "false"));
    render();
  });

  // -------- filtering --------
  function matches(plant) {
    if (state.search) {
      const hay = (plant.name + " " + plant.sci + " " + plant.fam).toLowerCase();
      if (!hay.includes(state.search)) return false;
    }

    if (state.statuses.size > 0) {
      const status = classify(plant[state.animal]);
      if (!state.statuses.has(status)) return false;
    }

    if (state.tags.size > 0) {
      const hasSeasonal = plant.tags.includes("SEASONAL");
      const hasDry = plant.tags.includes("DRY-FRIENDLY");
      const hasTJ = !!plant.tj;
      const anyMatch =
        (state.tags.has("SEASONAL") && hasSeasonal) ||
        (state.tags.has("DRY-FRIENDLY") && hasDry) ||
        (state.tags.has("TJ") && hasTJ);
      if (!anyMatch) return false;
    }

    return true;
  }

  // -------- render --------
  function render() {
    const filtered = state.plants.filter(matches);

    resultCountEl.textContent = filtered.length
      ? `Showing ${filtered.length} of ${state.plants.length} specimens — ${state.animal}s`
      : "";
    emptyStateEl.hidden = filtered.length !== 0;
    clearBtn.hidden = !(
      state.search ||
      state.statuses.size > 0 ||
      state.tags.size > 0
    );

    drawerEl.innerHTML = "";
    const frag = document.createDocumentFragment();

    filtered.forEach((plant) => {
      const node = cardTemplate.content.cloneNode(true);
      const status = classify(plant[state.animal]);

      const stampEl = node.querySelector(".card__stamp");
      stampEl.dataset.status = status;
      stampEl.textContent = STATUS_LABEL[status];

      node.querySelector(".card__name").textContent = plant.name;
      node.querySelector(".card__sci").textContent = plant.sci;
      node.querySelector(".card__fam").textContent = plant.fam + " family";

      node.querySelector(".f-season").textContent = plant.season || "—";
      node.querySelector(".f-light").textContent = plant.light || "—";

      node.querySelector(".f-principle").textContent = plant.principle || "—";
      node.querySelector(".f-climate").textContent = plant.climate || "—";
      node.querySelector(".f-zone").textContent = plant.zone || "—";
      node.querySelector(".f-water").textContent = plant.water || "—";
      node.querySelector(".f-dried").textContent = plant.dried || "—";
      node.querySelector(".f-wholesale").textContent = plant.wholesale || "—";
      node.querySelector(".f-retail").textContent = plant.retail || "—";

      const tjRow = node.querySelector(".f-tj-row");
      if (plant.tj) {
        tjRow.classList.add("is-shown");
        node.querySelector(".f-tj").textContent = plant.tj;
      }

      node.querySelector(".f-cat-status").textContent = plant.cat;
      node.querySelector(".f-dog-status").textContent = plant.dog;
      node.querySelector(".f-horse-status").textContent = plant.horse;

      const expandBtn = node.querySelector(".card__expand");
      const detailEl = node.querySelector(".card__detail");
      expandBtn.addEventListener("click", () => {
        const open = detailEl.classList.toggle("is-open");
        expandBtn.setAttribute("aria-expanded", String(open));
      });

      frag.appendChild(node);
    });

    drawerEl.appendChild(frag);
  }
})();
