// Dynamic breadcrumb generation based on actual navigation path
function buildBreadcrumb() {
  const referrer = document.referrer;
  const crumbs = document.querySelector('.ph-crumbs');
  if (!crumbs) return;

  // Get all breadcrumb items
  const items = crumbs.querySelectorAll('a, .current');
  const links = Array.from(crumbs.querySelectorAll('a')).map(a => ({
    href: a.href,
    text: a.textContent,
    element: a
  }));
  const currentItem = crumbs.querySelector('.current');

  // Check if referrer contains a deal path
  const fromDeal = referrer.includes('/deals/');
  // Check if referrer contains a facility path
  const fromFacility = referrer.includes('/facilities/');
  // Check if referrer contains a drawing path
  const fromDrawing = referrer.includes('/drawings/');

  // For facility pages: hide deal link if coming directly from customer or home
  if (currentItem && (currentItem.textContent.includes('Loan') || currentItem.textContent.includes('Facility') || currentItem.textContent.includes('Credit') || currentItem.textContent.includes('Finance Facility'))) {
    if (!fromDeal) {
      // Find and remove deal link
      const dealLink = Array.from(crumbs.querySelectorAll('a')).find(a =>
        a.textContent.includes('Financing') ||
        a.textContent.includes('Capital') ||
        a.textContent.includes('Finance') && a.href.includes('/deals/')
      );
      if (dealLink) {
        // Remove the deal link and its preceding separator
        const sep = dealLink.previousElementSibling;
        if (sep && sep.classList.contains('sep')) {
          sep.remove();
        }
        dealLink.remove();
      }
    }
  }

  // For drawing pages: hide facility and deal links if coming directly from facility/customer
  if (currentItem && (currentItem.textContent.includes('Loan') && currentItem.textContent.includes('•') ||
                      currentItem.textContent.includes('Credit') && currentItem.textContent.includes('•') ||
                      currentItem.textContent.includes('Guarantee') ||
                      currentItem.textContent.includes('Letter'))) {
    if (!fromDeal && !fromFacility) {
      // Remove deal and facility links
      const allLinks = Array.from(crumbs.querySelectorAll('a'));
      allLinks.forEach((link, idx) => {
        if ((link.textContent.includes('Financing') ||
             link.textContent.includes('Capital') ||
             link.textContent.includes('Finance') && link.href.includes('/deals/')) ||
            (link.textContent.includes('Loan') && !link.textContent.includes('•') ||
             link.textContent.includes('Facility'))) {
          const sep = link.previousElementSibling;
          if (sep && sep.classList.contains('sep')) {
            sep.remove();
          }
          link.remove();
        }
      });
    } else if (fromFacility && !fromDeal) {
      // Remove only deal link
      const dealLink = Array.from(crumbs.querySelectorAll('a')).find(a =>
        a.textContent.includes('Financing') ||
        a.textContent.includes('Capital') ||
        a.textContent.includes('Finance') && a.href.includes('/deals/')
      );
      if (dealLink) {
        const sep = dealLink.previousElementSibling;
        if (sep && sep.classList.contains('sep')) {
          sep.remove();
        }
        dealLink.remove();
      }
    }
  }
}

// Run when DOM is ready
document.addEventListener('DOMContentLoaded', buildBreadcrumb);
