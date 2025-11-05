// UNIVERSAL NEWS NAVIGATION CODE
// Place this code globally (runs on all pages)

(function() {
    'use strict';
    
    // Prevent multiple initializations
    if (window.newsNavigationInitialized) {
        return;
    }
    window.newsNavigationInitialized = true;

    // Check if we're on the news page
    const isNewsPage = window.location.pathname.includes('/news') || 
                      document.querySelector('[news-page-identifier]') !== null;

    document.addEventListener("DOMContentLoaded", function () {
        
        if (isNewsPage) {
            // NEWS PAGE FUNCTIONALITY
            initializeNewsPageScrolling();
        } else {
            // OTHER PAGES (Home, Bio, etc.) FUNCTIONALITY
            initializeNewsLinks();
        }
    });

    function initializeNewsLinks() {
        let isInitialized = false;
        
        function setupNewsLinks() {
            if (isInitialized) return;
            
            const newsItems = document.querySelectorAll("[news-item]");
            if (newsItems.length === 0) return;
            
            newsItems.forEach(item => {
                // Check if already has our listener
                if (item.hasAttribute('data-news-listener')) return;
                
                item.setAttribute('data-news-listener', 'true');
                item.addEventListener("click", handleNewsClick);
            });
            
            isInitialized = true;
        }

        function handleNewsClick(event) {
            // Prevent any default behavior that might cause reload
            event.preventDefault();
            event.stopPropagation();
            
            try {
                const newsSlug = this.getAttribute("news-item");
                
                if (!newsSlug || newsSlug.trim() === '') {
                    console.warn('News item clicked but no slug found:', this);
                    return false;
                }

                // Store the slug
                if (typeof(Storage) !== "undefined") {
                    try {
                        window.localStorage.setItem("searchParamNews", newsSlug);
                        console.log('Stored news slug:', newsSlug);
                    } catch (e) {
                        console.warn('Failed to set localStorage, using URL parameter:', e);
                        window.location.href = `/news?item=${encodeURIComponent(newsSlug)}`;
                        return false;
                    }
                } else {
                    window.location.href = `/news?item=${encodeURIComponent(newsSlug)}`;
                    return false;
                }

                // Navigate to news page
                window.location.href = "/news";
                
            } catch (error) {
                console.error('Error handling news item click:', error);
            }
            
            return false;
        }

        // Initial setup
        setupNewsLinks();

        // Handle dynamic content
        const contentWrapper = document.querySelector("[get-no-of-items]") || document.body;
        if (window.MutationObserver) {
            const observer = new MutationObserver(function(mutations) {
                let hasNewNewsItems = false;
                
                mutations.forEach(function(mutation) {
                    if (mutation.type === 'childList') {
                        mutation.addedNodes.forEach(function(node) {
                            if (node.nodeType === 1) {
                                if ((node.hasAttribute && node.hasAttribute('news-item')) || 
                                    (node.querySelector && node.querySelector('[news-item]'))) {
                                    hasNewNewsItems = true;
                                }
                            }
                        });
                    }
                });
                
                if (hasNewNewsItems) {
                    setTimeout(setupNewsLinks, 100);
                }
            });
            
            observer.observe(contentWrapper, { 
                childList: true, 
                subtree: true 
            });
        }
    }

    function initializeNewsPageScrolling() {
        let hasProcessedNewsSlug = false;
        let retryCount = 0;
        const maxRetries = 30;
        const retryDelay = 200;
        let paginationAttempts = 0;
        const maxPaginationAttempts = 10;

        function getNewsSlugFromStorage() {
            if (typeof(Storage) === "undefined") return null;
            
            try {
                return window.localStorage.getItem("searchParamNews");
            } catch (e) {
                console.warn('Failed to read from localStorage:', e);
                return null;
            }
        }

        function getNewsSlugFromURL() {
            try {
                const urlParams = new URLSearchParams(window.location.search);
                return urlParams.get('item');
            } catch (e) {
                console.warn('Failed to read URL parameters:', e);
                return null;
            }
        }

        function clearStoredNewsSlug() {
            if (typeof(Storage) === "undefined") return;
            
            try {
                window.localStorage.removeItem("searchParamNews");
                console.log('Cleared stored news slug');
            } catch (e) {
                console.warn('Failed to clear localStorage:', e);
            }
        }

        function scrollToAndOpenNews() {
            if (hasProcessedNewsSlug) {
                return;
            }

            const storedNewsSlug = getNewsSlugFromStorage() || getNewsSlugFromURL();
            if (!storedNewsSlug) {
                console.log('No news slug found to process');
                return;
            }

            console.log('Processing news slug:', storedNewsSlug);

            const newsItems = document.querySelectorAll("[news-item]");
            
            if (newsItems.length === 0) {
                if (retryCount < maxRetries) {
                    retryCount++;
                    console.log(`No news items found, retrying... (${retryCount}/${maxRetries})`);
                    setTimeout(scrollToAndOpenNews, retryDelay);
                } else {
                    console.warn('Max retries reached, news items not found');
                    clearStoredNewsSlug();
                }
                return;
            }

            let targetNewsItem = null;
            newsItems.forEach(newsItem => {
                if (newsItem.getAttribute("news-item") === storedNewsSlug) {
                    targetNewsItem = newsItem;
                }
            });

            if (!targetNewsItem) {
                console.log('News item not found on current page, checking pagination...');
                handlePaginatedSearch(storedNewsSlug);
                return;
            }

            // Mark as processed BEFORE doing anything to prevent loops
            hasProcessedNewsSlug = true;
            clearStoredNewsSlug();

            try {
                console.log('Found target news item, scrolling...');
                
                targetNewsItem.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center',
                    inline: 'nearest'
                });

                setTimeout(() => {
                    try {
                        console.log('Triggering click on news item...');
                        
                        const clickEvent = new MouseEvent('click', {
                            bubbles: true,
                            cancelable: true,
                            view: window
                        });
                        
                        targetNewsItem.dispatchEvent(clickEvent);
                        
                    } catch (e) {
                        console.error('Failed to trigger click on news item:', e);
                    }
                }, 800);

            } catch (error) {
                console.error('Error processing news item:', error);
            }
        }

        function handlePaginatedSearch(newsSlug) {
            if (paginationAttempts >= maxPaginationAttempts) {
                console.warn('Max pagination attempts reached, giving up');
                clearStoredNewsSlug();
                showNewsItemNotFoundMessage(newsSlug);
                return;
            }
            
            paginationAttempts++;
            console.log(`Searching for news item across pages... (attempt ${paginationAttempts})`);
            
            const nextPageButton = document.querySelector('.jetboost-pagination-next-x1gy') ||
                                 document.querySelector('[data-jetboost-element="pg-next"]') ||
                                 document.querySelector('.jetboost-pagination-next') ||
                                 document.querySelector('[jetboost-pagination="next"]') ||
                                 document.querySelector('a[aria-label*="next"]') ||
                                 document.querySelector('.w-pagination-next');
            
            const loadMoreButton = document.querySelector('[data-jetboost-element="load-more"]') ||
                                 document.querySelector('.jetboost-load-more') ||
                                 document.querySelector('[jetboost-pagination="load-more"]');
            
            if (loadMoreButton && !loadMoreButton.disabled && loadMoreButton.style.display !== 'none') {
                console.log('Found load more button, clicking to load more items...');
                
                const observer = new MutationObserver(function(mutations) {
                    let hasNewItems = false;
                    mutations.forEach(function(mutation) {
                        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                            mutation.addedNodes.forEach(function(node) {
                                if (node.nodeType === 1 && 
                                    ((node.hasAttribute && node.hasAttribute('news-item')) || 
                                     (node.querySelector && node.querySelector('[news-item]')))) {
                                    hasNewItems = true;
                                }
                            });
                        }
                    });
                    
                    if (hasNewItems) {
                        observer.disconnect();
                        setTimeout(() => {
                            const targetItem = document.querySelector(`[news-item="${newsSlug}"]`);
                            if (targetItem) {
                                console.log('Found target item after loading more content');
                                hasProcessedNewsSlug = true;
                                clearStoredNewsSlug();
                                
                                targetItem.scrollIntoView({ 
                                    behavior: 'smooth', 
                                    block: 'center' 
                                });
                                
                                setTimeout(() => {
                                    const clickEvent = new MouseEvent('click', {
                                        bubbles: true,
                                        cancelable: true,
                                        view: window
                                    });
                                    targetItem.dispatchEvent(clickEvent);
                                }, 800);
                            } else {
                                setTimeout(() => {
                                    if (!loadMoreButton.disabled && loadMoreButton.style.display !== 'none') {
                                        handlePaginatedSearch(newsSlug);
                                    } else {
                                        console.warn('News item not found after loading all content');
                                        clearStoredNewsSlug();
                                    }
                                }, 500);
                            }
                        }, 1000);
                    }
                });
                
                const newsWrapper = document.querySelector("[get-no-of-items]") || document.body;
                observer.observe(newsWrapper, { childList: true, subtree: true });
                
                loadMoreButton.click();
                
            } else if (nextPageButton && !nextPageButton.classList.contains('disabled') && 
                      !nextPageButton.disabled && nextPageButton.style.display !== 'none') {
                console.log('Found next page button, navigating to next page...');
                
                hasProcessedNewsSlug = false;
                retryCount = 0;
                
                const observer = new MutationObserver(function(mutations) {
                    let pageContentChanged = false;
                    mutations.forEach(function(mutation) {
                        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                            mutation.addedNodes.forEach(function(node) {
                                if (node.nodeType === 1 && 
                                    ((node.hasAttribute && node.hasAttribute('news-item')) || 
                                     (node.querySelector && node.querySelector('[news-item]')))) {
                                    pageContentChanged = true;
                                }
                            });
                        }
                    });
                    
                    if (pageContentChanged) {
                        observer.disconnect();
                        console.log('Page content changed, searching for target item...');
                        setTimeout(() => {
                            scrollToAndOpenNews();
                        }, 1500);
                    }
                });
                
                const newsWrapper = document.querySelector("[get-no-of-items]") || document.body;
                observer.observe(newsWrapper, { childList: true, subtree: true });
                
                setTimeout(() => {
                    observer.disconnect();
                    if (!hasProcessedNewsSlug) {
                        console.log('Fallback: Checking for target item after page navigation...');
                        scrollToAndOpenNews();
                    }
                }, 3000);
                
                nextPageButton.click();
                
            } else {
                console.warn('News item not found and no pagination options available');
                clearStoredNewsSlug();
                showNewsItemNotFoundMessage(newsSlug);
            }
        }
        
        function showNewsItemNotFoundMessage(newsSlug) {
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #f44336;
                color: white;
                padding: 12px 20px;
                border-radius: 4px;
                z-index: 10000;
                font-family: Arial, sans-serif;
                font-size: 14px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            `;
            notification.textContent = 'News item not found. It may have been removed or archived.';
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 5000);
        }

        console.log('Initializing news page scrolling...');
        setTimeout(scrollToAndOpenNews, 500);

        const newsWrapper = document.querySelector("[get-no-of-items]");
        if (newsWrapper && window.MutationObserver && !hasProcessedNewsSlug) {
            const observer = new MutationObserver(function(mutations) {
                if (hasProcessedNewsSlug) {
                    observer.disconnect();
                    return;
                }
                
                let hasNewContent = false;
                mutations.forEach(function(mutation) {
                    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                        mutation.addedNodes.forEach(function(node) {
                            if (node.nodeType === 1) {
                                if ((node.hasAttribute && node.hasAttribute('news-item')) || 
                                    (node.querySelector && node.querySelector('[news-item]'))) {
                                    hasNewContent = true;
                                }
                            }
                        });
                    }
                });

                if (hasNewContent) {
                    setTimeout(scrollToAndOpenNews, 200);
                }
            });

            observer.observe(newsWrapper, { 
                childList: true, 
                subtree: true 
            });

            setTimeout(() => {
                observer.disconnect();
            }, 10000);
        }
    }

})();
