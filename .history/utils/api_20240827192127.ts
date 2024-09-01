export const getPriceData = async (token: string) => {
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/${token}/market_chart?vs_currency=usd&days=7`);
    const data = await response.json();
    return {
      dates: data.prices.map((price: any) => new Date(price[0]).toLocaleDateString()),
      prices: data.prices.map((price: any) => price[1]),
    };
  };
  