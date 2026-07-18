import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { motion, AnimatePresence } from 'motion/react';
import { Database, DownloadCloud, AlertCircle, CheckCircle2, Loader2, X } from 'lucide-react';

const CHECK_UPDATES = gql`
  query CheckUpdates {
    checkUpdates {
      type
      localCount
      apiCount
      hasUpdate
    }
  }
`;

const SYNC_NEW_DATA = gql`
  mutation SyncNewData {
    syncNewData
  }
`;

export default function UpdateNotifier() {
  const { data, loading, error, refetch } = useQuery(CHECK_UPDATES, {
    fetchPolicy: 'network-only' // always check API
  });
  
  const [syncNewData, { loading: syncing }] = useMutation(SYNC_NEW_DATA, {
    onCompleted: () => {
      setSyncComplete(true);
      refetch();
    }
  });

  const [isOpen, setIsOpen] = useState(true);
  const [syncComplete, setSyncComplete] = useState(false);

  if (loading || error || !data) return null;

  const updates = data.checkUpdates.filter((u: any) => u.hasUpdate);
  const hasUpdates = updates.length > 0;

  if (!hasUpdates && !syncComplete) return null;
  if (!isOpen) return null;

  const handleSync = () => {
    syncNewData();
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden"
      >
        <div className="p-4 bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border-b border-slate-700/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-blue-400" />
            <h3 className="font-semibold text-white">Database Status</h3>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          {syncComplete ? (
            <div className="flex flex-col items-center justify-center py-4 text-center">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mb-2" />
              <p className="text-emerald-300 font-medium">Cập nhật dữ liệu thành công!</p>
              <p className="text-sm text-slate-400 mt-1">Đã tải hình ảnh (WebP) và dữ liệu mới nhất.</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Tải lại trang
              </button>
            </div>
          ) : syncing ? (
            <div className="flex flex-col items-center justify-center py-4 text-center">
              <Loader2 className="w-10 h-10 text-blue-400 animate-spin mb-3" />
              <p className="text-blue-300 font-medium">Đang đồng bộ dữ liệu & tối ưu ảnh...</p>
              <p className="text-xs text-slate-400 mt-2">Vui lòng không đóng trình duyệt.</p>
            </div>
          ) : (
            <div className="flex flex-col">
              <div className="flex items-start gap-3 mb-4">
                <AlertCircle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-slate-200">
                    Phát hiện có cập nhật mới từ PokéAPI:
                  </p>
                  <ul className="mt-2 space-y-1">
                    {updates.map((u: any) => (
                      <li key={u.type} className="text-xs text-slate-400 flex justify-between">
                        <span className="capitalize">{u.type}s:</span>
                        <span className="text-slate-300">{u.localCount} &rarr; <span className="text-emerald-400 font-medium">{u.apiCount}</span></span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <button
                onClick={handleSync}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-blue-500/20"
              >
                <DownloadCloud className="w-4 h-4" />
                Tải xuống và Đồng bộ
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
