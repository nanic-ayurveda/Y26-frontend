 import React, { useEffect, useState } from 'react';
 import { useParams, Link } from 'react-router-dom';
 import { ArrowLeft, Calendar, Users, MapPin, Clock, DollarSign, Receipt } from 'lucide-react';
-import { eventsAPI, budgetsAPI, expensesAPI, Event, Budget, Expense } from '@/api';
+import { workshopsAPI, budgetsAPI, expensesAPI, Workshop, Budget, Expense } from '@/api';
 import { useAuth } from '@/context/AuthContext';
 import { useApi } from '@/hooks/useApi';
 
-const EventDetail = () => {
+const WorkshopDetail = () => {
   const { id } = useParams<{ id: string }>();
   const { user } = useAuth();
-  const [event, setEvent] = useState<Event | null>(null);
+  const [workshop, setWorkshop] = useState<Workshop | null>(null);
   const [budgets, setBudgets] = useState<Budget[]>([]);
   const [expenses, setExpenses] = useState<Expense[]>([]);
 
-  const { execute: fetchEvent, loading: eventLoading } = useApi(eventsAPI.getById, {
+  const { execute: fetchWorkshop, loading: workshopLoading } = useApi(workshopsAPI.getById, {
     showSuccessToast: false,
     showErrorToast: true,
-    errorMessage: 'Failed to fetch event details'
+    errorMessage: 'Failed to fetch workshop details'
   });
 
@@ .. @@
   useEffect(() => {
-    const fetchEventData = async () => {
+    const fetchWorkshopData = async () => {
       if (!id) return;
 
-      const eventData = await fetchEvent(id);
-      if (eventData) {
-        setEvent(eventData);
+      const workshopData = await fetchWorkshop(id);
+      if (workshopData) {
+        setWorkshop(workshopData);
       }
 
@@ .. @@
       if (expenseData) setExpenses(expenseData);
     };
 
-    fetchEventData();
+    fetchWorkshopData();
   }, [id]);
 
@@ .. @@
     return budgets.reduce((sum, budget) => sum + (budget.approvedAmount || budget.amount), 0);
   };
 
-  if (eventLoading) {
+  if (workshopLoading) {
     return (
       <div className="flex items-center justify-center min-h-96">
@@ .. @@
     );
   }
 
-  if (!event) {
+  if (!workshop) {
     return (
       <div className="text-center py-12">
-        <h3 className="mt-2 text-sm font-medium text-gray-900">Event not found</h3>
+        <h3 className="mt-2 text-sm font-medium text-gray-900">Workshop not found</h3>
         <p className="mt-1 text-sm text-gray-500">
-          The event you're looking for doesn't exist or you don't have permission to view it.
+          The workshop you're looking for doesn't exist or you don't have permission to view it.
         </p>
         <Link
-          to="/events"
+          to="/workshops"
           className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
         >
           <ArrowLeft className="h-4 w-4 mr-2" />
-          Back to Events
+          Back to Workshops
         </Link>
       </div>
@@ .. @@
       <div className="space-y-6">
         <div className="flex items-center space-x-4">
           <Link
-            to="/events"
+            to="/workshops"
             className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
           >
             <ArrowLeft className="h-4 w-4 mr-2" />
-            Back to Events
+            Back to Workshops
           </Link>
           
           <div>
-            <h1 className="text-2xl font-bold text-gray-900">{event.name}</h1>
-            <p className="mt-1 text-sm text-gray-600">Event Details and Financial Overview</p>
+            <h1 className="text-2xl font-bold text-gray-900">{workshop.title}</h1>
+            <p className="mt-1 text-sm text-gray-600">Workshop Details and Financial Overview</p>
           </div>
         </div>
 
-        {/* Event Info */}
+        {/* Workshop Info */}
         <div className="bg-white shadow rounded-lg p-6">
           <div className="flex items-center justify-between mb-4">
-            <h2 className="text-lg font-semibold text-gray-900">Event Information</h2>
-            {getStatusBadge(event.status)}
+            <h2 className="text-lg font-semibold text-gray-900">Workshop Information</h2>
+            {getStatusBadge(workshop.status)}
           </div>
           
@@ .. @@
             <div>
               <h3 className="text-sm font-medium text-gray-500">Description</h3>
-              <p className="mt-1 text-sm text-gray-900">{event.description || 'No description provided'}</p>
+              <p className="mt-1 text-sm text-gray-900">{workshop.description || 'No description provided'}</p>
             </div>
             
             <div>
               <h3 className="text-sm font-medium text-gray-500">Type</h3>
-              <p className="mt-1 text-sm text-gray-900">{event.type}</p>
+              <p className="mt-1 text-sm text-gray-900">WORKSHOP</p>
             </div>
             
@@ .. @@
             <div>
               <h3 className="text-sm font-medium text-gray-500">Created by</h3>
-              <p className="mt-1 text-sm text-gray-900">{event.creator.name}</p>
+              <p className="mt-1 text-sm text-gray-900">{workshop.creator.name}</p>
             </div>
             
-            {event.coordinator && (
+            {workshop.coordinator && (
               <div>
                 <h3 className="text-sm font-med