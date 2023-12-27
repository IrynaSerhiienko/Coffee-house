const gridContainer = document.querySelector('.grid-gallery');
const cards = document.querySelectorAll('.preview');
const btnAddMore = document.querySelector('.more');
const tabs = document.querySelectorAll('.tab-item');
const url = 'src/data/products.json';
let moreButtonHidden = false;
let data;
let filterData;
let screenWidth;

fetch(url)
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then((fetchedData) => {
    data = fetchedData;
    // console.log('Data fetched successfully:', data);
    screenWidth = window.innerWidth;
    if (screenWidth >= 1440) {
      renderMenu(data.slice(0, 8));
      btnAddMore.classList.add('hide');
    } else {
      renderMenu(data.slice(0, 4));
      btnAddMore.classList.add('show');
    }

    btnAddMore.addEventListener('click', () => {
      renderMenu(data.slice(0, 8));
      btnAddMore.classList.add('hide');
    });
  })
  .catch((error) => {
    // console.log('Error fetching data:', error);
  });

window.addEventListener('load', () => {
//   console.log('LOAD!!!!>>>>>>>>>>>>>>>');
    // screenWidth = window.innerWidth;
    // if (screenWidth >= 1440) {
    //   renderMenu(data.slice(0, 8));
    //   btnAddMore.classList.add('hide');
    // } else {
    //   renderMenu(data.slice(0, 4));
    //   btnAddMore.classList.add('show');
    // }

    // btnAddMore.addEventListener('click', () => {
    //   renderMenu(data.slice(0, 8));
    //   btnAddMore.classList.add('hide');
    // });
});

window.addEventListener('resize', () => {
  screenWidth = window.innerWidth;

  if (data) {
    if (screenWidth >= 1440) {
      renderMenu(data.slice(0, 8));
      btnAddMore.classList.add('hide');
    } else {
      if (data.length <= 4) {
        renderMenu(data.slice(0, 4));
        btnAddMore.classList.add('hide');
      } else {
        renderMenu(data.slice(0, 4));
        btnAddMore.classList.remove('hide');
        btnAddMore.classList.add('show');
      }
    }
  }

  if (filterData) {
    if (screenWidth >= 1440) {
      renderMenu(filterData.slice(0, 8));
      btnAddMore.classList.add('hide');
    } else {
      if (filterData.length <= 4) {
        renderMenu(filterData.slice(0, 4));
        btnAddMore.classList.add('hide');
      } else {
        renderMenu(filterData.slice(0, 4));
        btnAddMore.classList.remove('hide');
        btnAddMore.classList.add('show');
      }
    }
  }
});

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((tab) => {
      tab.classList.remove('active');
    });
    tab.classList.add('active');
    const category = tab.dataset.category;
    filterData = data.filter((item) => item.category === category);
    gridContainer.innerHTML = '';

    // console.log('filterData>>>', filterData.length);
    if (filterData.length <= 4) {
    //   console.log('filterData <= 4');
      btnAddMore.classList.add('hide');
    } else {
      btnAddMore.classList.remove('hide');
      btnAddMore.classList.add('show');
    }

    if (filterData) {
      if (screenWidth >= 1440) {
        renderMenu(filterData);
        btnAddMore.classList.add('hide');
      } else {
        renderMenu(filterData.slice(0, 4));
        btnAddMore.classList.add('show');
      }

      btnAddMore.addEventListener('click', () => {
        renderMenu(filterData);
        btnAddMore.classList.add('hide');
      });
    }
  });
});

function renderMenu(menu) {
  gridContainer.innerHTML = '';

  for (let i = 0; i < menu.length; i++) {
    const item = menu[i];
    if (item) {
      const preview = document.createElement('div');
      preview.classList.add('preview');
      preview.innerHTML = `
        <div class='img-container'>
            <img src='${item.image}' alt='${item.name}' />
        </div>
        <div class='menu-description-container'>
            <p class='tytle'>${item.name}</p>
            <p class='description'>${item.description}</p>
            <p class='price'>$${item.price}</p>
        </div>
        `;
      gridContainer.appendChild(preview);

      createModal(preview, item);
    }
  }
}

function createModal(preview, data) {
  let totalPrice = parseFloat(data.price);
  let sum;
  //   selectMenu.innerHTML = '';

  preview.addEventListener('click', () => {
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');

    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="img-container">
            <img src="${data.image}" alt="${data.name}" />
        </div>
        <div class="modal-description-container">
            <div class="title-container">
                <p class="tytle">${data.name}</p>
                <p class="description">${data.description}</p>
            </div>
            <div class="size-container">
                <p class="text">Size</p>
                <div class="tabs">
                    <button class="tab-sizes active" data-sizes="S">
                        <span class="icon-text">S</span>
                        <span class="text">${data.sizes.s.size}</span>
                    </button>
                    <button class="tab-sizes" data-sizes="M">
                        <span class="icon-text">M</span>
                        <span class="text">${data.sizes.m.size}</span>
                    </button>
                    <button class="tab-sizes" data-sizes="L">
                        <span class="icon-text">L</span>
                        <span class="text">${data.sizes.l.size}</span>
                    </button>
                </div>
            </div>
            <div class="additives-container">
                <p class="text">Additives</p>
                <div class="tabs">
                    <button class="tab-additives" data-additives="1">
                        <span class="icon-text">1</span>
                        <span class="text">${data.additives[0].name}</span>
                    </button>
                    <button class="tab-additives" data-additives="2">
                        <span class="icon-text">2</span>
                        <span class="text">${data.additives[1].name}</span>
                    </button>
                    <button class="tab-additives" data-additives="3">
                        <span class="icon-text">3</span>
                        <span class="text">${data.additives[2].name}</span>
                    </button>
                </div>
            </div>
            <div class="total-container">
                <p class="text">Total:</p>
                <p class="price-modal">$${data.price}</p>
            </div>
            <div class="alert-container">
                <div class="icon-container">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    >
                    <g clip-path="url(#clip0_268_9737)">
                        <path
                        d="M8 7.66663V11"
                        stroke="#403F3D"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        />
                        <path
                        d="M8 5.00667L8.00667 4.99926"
                        stroke="#403F3D"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        />
                        <path
                        d="M8.00016 14.6667C11.6821 14.6667 14.6668 11.6819 14.6668 8.00004C14.6668 4.31814 11.6821 1.33337 8.00016 1.33337C4.31826 1.33337 1.3335 4.31814 1.3335 8.00004C1.3335 11.6819 4.31826 14.6667 8.00016 14.6667Z"
                        stroke="#403F3D"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        />
                    </g>
                    <defs>
                        <clipPath id="clip0_268_9737">
                        <rect width="16" height="16" fill="white" />
                        </clipPath>
                    </defs>
                    </svg>
                </div>
                <p class="text">The cost is not final. Download our mobile app to see the final price and place your order. Earn loyalty points and enjoy your favorite coffee with up to 20% discount.
                </p>
            </div>
            <button class="btn-close-modal">Close</button>
        </div>
                `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    document.body.style.overflow = 'hidden';

    overlay.addEventListener('click', (event) => {
      if (!modal.contains(event.target) && !event.target.classList.contains('btn-close-modal')) {
        closeModal();
      }
    });

    const btnCloseModal = document.querySelector('.btn-close-modal');
    btnCloseModal.addEventListener('click', () => {
      closeModal();
    });

    function closeModal() {
      document.body.removeChild(overlay);
      overlay.removeEventListener('click', closeModal);
      btnCloseModal.removeEventListener('click', closeModal);
      document.body.style.overflow = 'auto';
    }

    const sizesTabs = document.querySelectorAll('.tab-sizes');
    const additivesTabs = document.querySelectorAll('.tab-additives');
    let selectedSize = null;
    let selectedAdditives = [];

    sizesTabs.forEach((sizesTab) => {
      sizesTab.addEventListener('click', (event) => {
        const target = event.target.closest('.tab-sizes[data-sizes]');
        // const target = event.target.closest('.tab-item[data-sizes], .tab-item[data-additives]');
        sizesTabs.forEach((tab) => {
          tab.classList.remove('active');
        });
        sizesTab.classList.add('active');
        selectedSize = target.dataset.sizes;
        updateTotalPrice();
      });
    });

    additivesTabs.forEach((additivesTab) => {
      additivesTab.addEventListener('click', (event) => {
        const target = event.target.closest('.tab-additives[data-additives]');
        const isActive = additivesTab.classList.toggle('active');
        const selectedAdditive = target.dataset.additives;

        if (isActive) {
          selectedAdditives.push(selectedAdditive);
        } else {
          selectedAdditives = selectedAdditives.filter((additive) => additive !== selectedAdditive);
        }
        updateTotalPrice();
      });
    });

    function updateTotalPrice() {
      sum = document.querySelector('.price-modal');
      totalPrice = parseFloat(data.price);

      if (selectedSize === 'S') {
        totalPrice += parseFloat(data.sizes.s['add-price']);
      } else if (selectedSize === 'M') {
        totalPrice += parseFloat(data.sizes.m['add-price']);
      } else if (selectedSize === 'L') {
        totalPrice += parseFloat(data.sizes.l['add-price']);
      }

      selectedAdditives.forEach((additive) => {
        if (additive === '1') {
          totalPrice += parseFloat(data.additives[0]['add-price']);
        }
        if (additive === '2') {
          totalPrice += parseFloat(data.additives[0]['add-price']);
        }
        if (additive === '3') {
          totalPrice += parseFloat(data.additives[0]['add-price']);
        }
      });
      sum.innerText = `$${totalPrice.toFixed(2)}`;
    }
  });
}
