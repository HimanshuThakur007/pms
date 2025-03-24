import { useCallback } from "react";
import useFetch from "../../Hooks/useFetch";
import { useNavigate } from "react-router";
import { showErrorToast, showSuccessToast } from "../Toaster";
import Swal from "sweetalert2";

interface LoadTableDataProps {
  url: string;
  setState: React.Dispatch<React.SetStateAction<any>>;
  setLoading:any;
  
}

interface LoadDropdownOptionsProps {
  url: string;
  setState: React.Dispatch<React.SetStateAction<any>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  stateKey?: string | null;
  valueKey?: string;
  labelKey?: string;
  additionalKeys?: string[];
}

interface SubmitHandlerProps {
  url: string;
  method?: "POST" | "PUT";
  data: any;
  onSuccess?: (response: any) => void;
  refreshList?: () => void; 
  closeModal?: () => void; 
  onError?: (error: any) => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  navigateTo?: string;
  resetForm?: () => void;
}

interface FetchedItem {
  [key: string]: any;
}
interface DeleteHandlerProps {
  url: string;
  data: any;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  refreshList?: () => void;
  onSuccess?: (response: any) => void;
  onError?: (error: any) => void;
}

export const useApiHandler = () => {
  const callFetch = useFetch();
  const navigate = useNavigate();
// ==============for-Table Data===================
  const loadTableData = useCallback(async ({
    url,
    setState,
    setLoading,
  }: LoadTableDataProps): Promise<void> => {
    try {
      setLoading(true);
      const { res, got } = await callFetch(url, "GET");

      if (res.status === 200) {
        setState(got.data);
      } else {
        console.error("Failed to load table data:", got);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }, [callFetch]);
  
// =============for drop-down with any name=====================
  const loadDropdownOptions = useCallback(async ({
    url,
    setState,
    setLoading,
    stateKey = null,
    valueKey = "code",
    labelKey = "name",
    additionalKeys = [],
  }: LoadDropdownOptionsProps): Promise<void> => {
    try {
      setLoading(true);
      const { res, got } = await callFetch(url, "GET");

      if (res.status === 200 && got.status === 1) {
        const mappedData = got.data.map((item: FetchedItem) => {
          const mappedItem: { value: any; label: any; [key: string]: any } = {
            value: item[valueKey],
            label: item[labelKey],
          };
          additionalKeys.forEach((key) => {
            if (item[key] !== undefined) {
              mappedItem[key] = item[key];
            }
          });
          return mappedItem;
        });

        if (stateKey) {
          setState((prev: any) => ({ ...prev, [stateKey]: mappedData }));
        } else {
          setState(mappedData);
        }
      } else {
        console.log("Response:", got);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }, [callFetch]);
// ===================for submit or save =================================

  const handleSubmit = useCallback(async ({
    url,
    method = "POST",
    data,
    onSuccess,
    onError,
    setLoading,
    refreshList,
    closeModal,
    navigateTo,
    resetForm, 
  }: SubmitHandlerProps): Promise<void> => {
    try {
      setLoading(true);
      const { res, got } = await callFetch(url, method, data);

      if (res.status === 200 || res.status === 201) {
        console.log("Submission successful:", got);
        showSuccessToast(got.msg)
        onSuccess?.(got);
        refreshList?.();
        closeModal?.();
        if (navigateTo) {
           navigate(navigateTo);
          }
          if (resetForm) {
            resetForm();
          }
      } else {
        console.error("Submission failed:", got);
        showErrorToast(got.msg);
        onError?.(got);
      }
    } catch (error) {
      console.error("Error during submission:", error);
      showErrorToast('An error occurred during submission.');
      onError?.(error);
    } finally {
      setLoading(false);
    }
  }, [callFetch]);

  // =============== modifyDataHandler ===============
  const modifyDataHandler = useCallback(async ({
    url,
    setLoading,
    onSuccess,
    onError,
  }: {
    url: string;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    onSuccess?: (data: any) => void;
    onError?: (status: number | null, message: string) => void;
  }): Promise<void> => {
    try {
      setLoading(true);

      // console.log("API URL:", url); 
      const { res, got } = await callFetch(url, "GET");

      console.log("API Response:", got); 

      if (res.status === 200 && got) {
        if (onSuccess && typeof onSuccess === "function") {
          console.log("Data to Pass to onSuccess:", got.data);
          onSuccess(got.data);
        }
      } else {
        if (onError && typeof onError === "function") {
          console.error("API Error:", got.msg);
          onError(res.status, got.msg);
        }
      }
    } catch (error) {
      console.error("Error in modifyDataHandler:", error);
    } finally {
      setLoading(false); 
    }
  }, [callFetch]);

    // Handle Delete (with Confirmation)
    const handleDelete = useCallback(async ({
      url,
      data,
      setLoading,
      refreshList,
      onSuccess,
      onError,
    }: DeleteHandlerProps): Promise<void> => {
      Swal.fire({
        title: "Are you sure?",
        text: "This action cannot be undone!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            setLoading(true);
            const { res, got } = await callFetch(url, "POST", data);
  
            if (res.status === 200 || res.status === 201) {
              console.log("Deletion successful:", got);
              showSuccessToast(got.msg || "Deleted successfully!");
              onSuccess?.(got);
              refreshList?.();
            } else {
              console.error("Deletion failed:", got);
              showErrorToast(got.msg || "Failed to delete.");
              onError?.(got);
            }
          } catch (error) {
            console.error("Error during deletion:", error);
            showErrorToast("An error occurred during deletion.");
            onError?.(error);
          } finally {
            setLoading(false);
          }
        }
      });
    }, [callFetch]);

  return { loadTableData, loadDropdownOptions, handleSubmit,modifyDataHandler, handleDelete };
};



