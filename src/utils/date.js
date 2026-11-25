/**
 * Date helper for Hindi News Portal
 */

export function getFormattedCurrentDateHindi() {
  const now = new Date();
  const days = ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'];
  const months = [
    'जनवरी', 'फरवरी', 'मार्च', 'अप्रैल', 'मई', 'जून',
    'जुलाई', 'अगस्त', 'सितम्बर', 'अक्टूबर', 'नवम्बर', 'दिसम्बर'
  ];

  const dayName = days[now.getDay()];
  const date = now.getDate();
  const monthName = months[now.getMonth()];
  const year = now.getFullYear();

  return `${dayName}, ${date} ${monthName} ${year}`;
}

export function formatTimeAgo(isoString) {
  if (!isoString) return 'हाल ही में';
  const now = new Date();
  const past = new Date(isoString);
  const diffInHours = Math.floor((now - past) / (1000 * 60 * 60));

  if (diffInHours < 1) {
    const diffInMinutes = Math.floor((now - past) / (1000 * 60));
    return diffInMinutes <= 1 ? 'अभी' : `${diffInMinutes} मिनट पहले`;
  }
  if (diffInHours < 24) {
    return `${diffInHours} घंटे पहले`;
  }
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays} दिन पहले`;
}
