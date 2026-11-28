import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Button } from './common/Button';
import styles from '../styles/components/UpdateNotifier.module.scss';
import { Database, DownloadCloud, CheckCircle2, X } from 'lucide-react';

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
  
  const [syncNewData, { loading: syncing, error: syncError }] = useMutation(SYNC_NEW_DATA, {
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
    void syncNewData().catch(() => undefined);
  };

  return (
    <section className={styles.panel} aria-labelledby="data-update-title">
      <header className={styles.heading}>
        <h2 id="data-update-title"><Database size={18} aria-hidden="true" /> Database status</h2>
        <Button size="icon" variant="ghost" aria-label="Dismiss database update" onClick={() => setIsOpen(false)}>
          <X size={18} aria-hidden="true" />
        </Button>
      </header>

      <div className={styles.body} lang="vi">
        {syncComplete ? (
          <>
            <p role="status"><CheckCircle2 size={16} aria-hidden="true" /> Cập nhật dữ liệu thành công!</p>
            <p>Đã tải hình ảnh (WebP) và dữ liệu mới nhất.</p>
            <Button onClick={() => window.location.reload()}>Tải lại trang</Button>
          </>
        ) : syncing ? (
          <p role="status">Đang đồng bộ dữ liệu và tối ưu ảnh. Vui lòng giữ trình duyệt mở.</p>
        ) : (
          <>
            <p>Phát hiện có cập nhật mới từ PokéAPI.</p>
            <ul>
              {updates.map((update: {type: string; localCount: number; apiCount: number}) => (
                <li key={update.type}>
                  <span>{update.type}</span>
                  <span>{update.localCount} → {update.apiCount}</span>
                </li>
              ))}
            </ul>
            {syncError && <p className={styles.error} role="alert">{syncError.message}</p>}
            <Button onClick={handleSync}><DownloadCloud size={16} aria-hidden="true" /> Tải xuống và đồng bộ</Button>
          </>
        )}
      </div>
    </section>
  );
}
