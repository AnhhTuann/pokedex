import React from 'react';
import { Button } from '../components/common/Button';
import { InputField } from '../components/common/InputField';
import { Card } from '../components/common/Card';
import { Search } from 'lucide-react';

export default function UIShowcase() {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-12">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">UI Component Showcase</h1>
        <p className="text-gray-500 dark:text-gray-400">Giao diện Minimalist, hỗ trợ Dark Mode hoàn chỉnh</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-800 pb-2">1. Buttons</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="ghost">Ghost Button</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="primary" isLoading>Loading...</Button>
          <Button variant="primary" disabled>Disabled</Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-800 pb-2">2. Input Fields</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="Default Input" placeholder="Type something..." />
          <InputField label="Input with Icon" placeholder="Search Pokemon..." icon={<Search className="w-5 h-5" />} />
          <InputField label="Error State" placeholder="Invalid data..." error="This field is required" defaultValue="Wrong value" />
          <InputField label="Disabled Input" placeholder="Cannot edit this" disabled />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-800 pb-2">3. Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">Default Card</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Đây là một Card mặc định với shadow nhẹ nhàng. Phù hợp để bọc nội dung.
            </p>
          </Card>
          
          <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600">
            <Card glass padding="lg">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">Glassmorphism Card</h3>
              <p className="text-gray-800 dark:text-gray-200 text-sm">
                Card trong suốt với backdrop blur, cực kỳ phù hợp khi đặt trên nền có gradient hoặc hình ảnh.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
