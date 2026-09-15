"use client";

import React from "react";
import { X, Layers, Database, Cpu, Tag, Activity } from "lucide-react";

export interface ProvenanceDetails {
  metricName: string;
  value: string | number;
  origin: "REAL" | "DERIVED" | "CONCEPTUAL" | "SIMULATION";
  tensorName?: string;
  layerIndex?: number | null;
  headIndex?: number | null;
  transformation?: string;
  description?: string;
}

interface ProvenanceInspectorProps {
  isOpen: boolean;
  onClose: () => void;
  details: ProvenanceDetails | null;
}

export default function ProvenanceInspector({
  isOpen,
  onClose,
  details,
}: ProvenanceInspectorProps) {
  if (!isOpen || !details) return null;

  const isReal = details.origin === "REAL";

  return (
    <div
      style={{
        position: "fixed",
        right: 16,
        top: 64,
        bottom: 16,
        width: 360,
        backgroundColor: "rgba(15, 23, 42, 0.95)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        borderRadius: 12,
        padding: 20,
        zIndex: 100,
        color: "#f8fafc",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          paddingBottom: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Activity size={18} style={{ color: "#38bdf8" }} />
          <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>
            Provenance Inspector
          </h3>
        </div>
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            color: "#94a3b8",
            cursor: "pointer",
            padding: 4,
          }}
        >
          <X size={18} />
        </button>
      </div>

      {/* Origin Badge */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span
          style={{
            backgroundColor: isReal ? "rgba(34, 197, 94, 0.15)" : "rgba(234, 179, 8, 0.15)",
            color: isReal ? "#4ade80" : "#fde047",
            border: `1px solid ${isReal ? "rgba(34, 197, 94, 0.3)" : "rgba(234, 179, 8, 0.3)"}`,
            padding: "4px 10px",
            borderRadius: 6,
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: 0.5,
          }}
        >
          {details.origin} DATA
        </span>
        <span style={{ fontSize: 12, color: "#94a3b8" }}>
          {isReal ? "Direct model output" : "Calculated from metadata"}
        </span>
      </div>

      {/* Main Metric Card */}
      <div
        style={{
          backgroundColor: "rgba(30, 41, 59, 0.6)",
          padding: 14,
          borderRadius: 8,
          border: "1px solid rgba(255, 255, 255, 0.05)",
        }}
      >
        <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 4 }}>
          {details.metricName}
        </div>
        <div style={{ fontSize: 20, fontWeight: 700, color: "#38bdf8" }}>
          {String(details.value)}
        </div>
      </div>

      {/* Technical Details List */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: 13 }}>
        {details.tensorName && (
          <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
            <Database size={16} style={{ color: "#94a3b8", marginTop: 2 }} />
            <div>
              <div style={{ color: "#94a3b8", fontSize: 11 }}>Source Tensor</div>
              <code style={{ color: "#cbd5e1", fontSize: 12, wordBreak: "break-all" }}>
                {details.tensorName}
              </code>
            </div>
          </div>
        )}

        {details.layerIndex !== undefined && details.layerIndex !== null && (
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Layers size={16} style={{ color: "#94a3b8" }} />
            <div>
              <div style={{ color: "#94a3b8", fontSize: 11 }}>Layer Index</div>
              <div style={{ color: "#e2e8f0" }}>Layer {details.layerIndex}</div>
            </div>
          </div>
        )}

        {details.headIndex !== undefined && details.headIndex !== null && (
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Cpu size={16} style={{ color: "#94a3b8" }} />
            <div>
              <div style={{ color: "#94a3b8", fontSize: 11 }}>Attention Head</div>
              <div style={{ color: "#e2e8f0" }}>Head {details.headIndex}</div>
            </div>
          </div>
        )}

        {details.transformation && (
          <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
            <Tag size={16} style={{ color: "#94a3b8", marginTop: 2 }} />
            <div>
              <div style={{ color: "#94a3b8", fontSize: 11 }}>Transformation</div>
              <code
                style={{
                  color: "#a7f3d0",
                  fontSize: 12,
                  backgroundColor: "rgba(6, 78, 59, 0.4)",
                  padding: "2px 6px",
                  borderRadius: 4,
                }}
              >
                {details.transformation}
              </code>
            </div>
          </div>
        )}
      </div>

      {details.description && (
        <div
          style={{
            marginTop: "auto",
            fontSize: 12,
            color: "#94a3b8",
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            paddingTop: 12,
            lineHeight: 1.4,
          }}
        >
          {details.description}
        </div>
      )}
    </div>
  );
}
