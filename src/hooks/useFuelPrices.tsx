import { useEffect, useState } from "react";
import supabase from "../api/supabaseClient";

export interface FuelPrice {
  id: number;
  fuel_type: string;
  region: string;
  price: number;
  created_at: string;
}

export interface FuelPriceChange {
  fuel_type: string;
  region: string;
  latest_price: number;
  previous_price: number;
  change_percentage: number;
}

export function useFuelPrices() {
  const [data, setData] = useState<FuelPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFuelPrices() {
      setLoading(true);
      const { data, error } = await supabase
        .from("fuel_prices")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(20);

      if (error) {
        setError(error.message);
        setData([]);
      } else {
        setData(data);
      }

      setLoading(false);
    }

    fetchFuelPrices();
  }, []);

  return { data, loading, error };
}

export function useFuelPriceChanges() {
  const [data, setData] = useState<FuelPriceChange[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFuelChanges() {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("fuel_price_changes")
        .select("*")
        .order("fuel_type", { ascending: true });

      if (error) {
        setError(error.message);
        setData(null);
      } else {
        setData(data);
      }

      setLoading(false);
    }

    fetchFuelChanges();
  }, []);

  return { data, loading, error };
}
