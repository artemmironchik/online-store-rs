import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { IProduct } from "../models/IProduct";
import { useParams } from "react-router-dom";

export function useProduct() {
  const [product, setProduct] = useState<IProduct | null>(null);

  const params = useParams();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchProducts() {
    try {
      setError("");
      setLoading(true);
      const response = axios.get<IProduct>(
        "https://fakestoreapi.com/products/" + params.id
      );
      setProduct((await response).data);
      setLoading(false);
    } catch (e: unknown) {
      const error = e as AxiosError;
      setLoading(false);
      setError(error.message);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return { product, error, loading };
}
