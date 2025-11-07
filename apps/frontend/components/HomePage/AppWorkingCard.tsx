"use client";
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "../ui/card";
import { LucideIcon } from "lucide-react";

interface Step {
  step: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

interface AppWorkingCardProps {
  steps: Step[];
}

const AppWorkingCard: React.FC<AppWorkingCardProps> = ({ steps }) => {
  return (
    <Card className="bg-white text-black border border-gray-300 rounded-md shadow-md hover:shadow-lg transition-all max-w-[400px]">
      <CardContent className="p-8 flex flex-col gap-8">
        {steps.map((s, index) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={index}
              className="flex items-start gap-4 text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              {/* Step Number */}
              <div className="flex flex-col items-center">
                <span className="font-bold text-lg">{s.step}</span>
                {index !== steps.length - 1 && (
                  <div className="w-[2px] h-12 bg-gray-400 mt-1 rounded-full" />
                )}
              </div>

              {/* Icon + Text */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Icon className="w-6 h-6 text-black" />
                  <h3 className="font-semibold text-xl">{s.title}</h3>
                </div>
                <p className="text-gray-700 text-base">{s.description}</p>
              </div>
            </motion.div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default AppWorkingCard;
